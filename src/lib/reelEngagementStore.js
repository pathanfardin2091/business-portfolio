import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const DATA_DIR = path.join(process.cwd(), ".data");
const DATA_FILE = path.join(DATA_DIR, "reel-engagement.json");
const KV_KEY = "fardesign:reel-engagement";
const VIEW_WINDOW_MS = 24 * 60 * 60 * 1000;
const MAX_DAILY_VIEWS_PER_REEL = 2;
let storeWriteQueue = Promise.resolve();

const defaultMetrics = {
  views: 0,
  uniqueViews: 0,
  watchTime: 0,
  likes: 0,
  viewers: {},
  likedViewers: {},
  dailyViews: [],
};

export async function getEngagement(
  videoIds,
  viewerId = "",
  initialMetricsByVideoId = {}
) {
  return updateStore((store) =>
    videoIds.reduce(
      (result, videoId) => {
        const metrics = ensureVideoMetrics(
          store,
          videoId,
          initialMetricsByVideoId[videoId]
        );

        result.engagement[videoId] = publicMetrics(metrics);

        if (viewerId && metrics.likedViewers[viewerId]) {
          result.likedVideos[videoId] = true;
        }

        return result;
      },
      { engagement: {}, likedVideos: {} }
    )
  );
}

export async function recordView(videoId, identity, watchState, initialMetrics) {
  return updateStore((store) => {
    const metrics = ensureVideoMetrics(store, videoId, initialMetrics);
    const now = Date.now();
    const recentViews = metrics.dailyViews.filter(
      (view) => now - view.timestamp < VIEW_WINDOW_MS
    );
    const viewerViewsToday = recentViews.filter(
      (view) => view.viewerId === identity.viewerId
    ).length;

    if (viewerViewsToday >= MAX_DAILY_VIEWS_PER_REEL) {
      store[videoId] = normalizeMetrics({ ...metrics, dailyViews: recentViews });
      return { counted: false, metrics: publicMetrics(store[videoId]) };
    }

    const isUniqueViewer = !metrics.viewers[identity.viewerId];
    store[videoId] = normalizeMetrics({
      ...metrics,
      views: metrics.views + 1,
      uniqueViews: metrics.uniqueViews + (isUniqueViewer ? 1 : 0),
      watchTime: metrics.watchTime + Math.round(watchState.watchSeconds || 0),
      viewers: {
        ...metrics.viewers,
        [identity.viewerId]: {
          firstSeenAt: metrics.viewers[identity.viewerId]?.firstSeenAt || now,
          fingerprint: identity.fingerprint || "",
        },
      },
      dailyViews: [
        ...recentViews,
        {
          timestamp: now,
          viewerId: identity.viewerId,
          sessionId: identity.sessionId || "",
          fingerprint: identity.fingerprint || "",
        },
      ],
    });

    return { counted: true, metrics: publicMetrics(store[videoId]) };
  });
}

export async function recordLike(videoId, identity, shouldLike, initialMetrics) {
  return updateStore((store) => {
    const metrics = ensureVideoMetrics(store, videoId, initialMetrics);
    const hasLiked = Boolean(metrics.likedViewers[identity.viewerId]);

    if (shouldLike && !hasLiked) {
      metrics.likes += 1;
      metrics.likedViewers[identity.viewerId] = {
        likedAt: Date.now(),
        fingerprint: identity.fingerprint || "",
      };
    }

    if (!shouldLike && hasLiked) {
      metrics.likes = Math.max(0, metrics.likes - 1);
      delete metrics.likedViewers[identity.viewerId];
    }

    store[videoId] = normalizeMetrics(metrics);

    return {
      liked: Boolean(store[videoId].likedViewers[identity.viewerId]),
      metrics: publicMetrics(store[videoId]),
    };
  });
}

async function updateStore(mutator) {
  const runUpdate = storeWriteQueue.then(async () => {
    const store = await readStore();
    const result = mutator(store);
    await writeStore(store);
    return result;
  });

  storeWriteQueue = runUpdate.catch(() => {});
  return runUpdate;
}

async function readStore() {
  // Production: set KV_REST_API_URL and KV_REST_API_TOKEN for shared storage.
  // Local development falls back to .data/reel-engagement.json.
  if (hasKvStore()) {
    return readKvStore();
  }

  try {
    return JSON.parse(await readFile(DATA_FILE, "utf8"));
  } catch {
    return {};
  }
}

async function writeStore(store) {
  if (hasKvStore()) {
    await writeKvStore(store);
    return;
  }

  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(DATA_FILE, JSON.stringify(store, null, 2));
}

async function readKvStore() {
  const response = await fetch(getRedisRestUrl(), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getRedisRestToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(["GET", KV_KEY]),
    cache: "no-store",
  });

  if (!response.ok) {
    return {};
  }

  const data = await response.json();
  if (!data.result) {
    return {};
  }

  return typeof data.result === "string" ? JSON.parse(data.result) : data.result;
}

async function writeKvStore(store) {
  const response = await fetch(getRedisRestUrl(), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getRedisRestToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(["SET", KV_KEY, JSON.stringify(store)]),
  });

  if (!response.ok) {
    throw new Error("Unable to write shared reel engagement store.");
  }
}

function hasKvStore() {
  return Boolean(getRedisRestUrl() && getRedisRestToken());
}

function getRedisRestUrl() {
  return process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || "";
}

function getRedisRestToken() {
  return (
    process.env.KV_REST_API_TOKEN ||
    process.env.UPSTASH_REDIS_REST_TOKEN ||
    ""
  );
}

function normalizeMetrics(metrics = {}) {
  return {
    ...defaultMetrics,
    ...metrics,
    viewers: metrics.viewers || {},
    likedViewers: metrics.likedViewers || {},
    dailyViews: metrics.dailyViews || [],
  };
}

function ensureVideoMetrics(store, videoId, initialMetrics = {}) {
  if (!store[videoId]) {
    store[videoId] = normalizeMetrics({
      views: initialMetrics.views || 0,
      uniqueViews: initialMetrics.uniqueViews || initialMetrics.views || 0,
      likes: initialMetrics.likes || 0,
    });
  } else {
    store[videoId] = normalizeMetrics(store[videoId]);
  }

  return store[videoId];
}

function publicMetrics(metrics) {
  const normalized = normalizeMetrics(metrics);

  return {
    views: normalized.views,
    uniqueViews: normalized.uniqueViews,
    watchTime: normalized.watchTime,
    likes: normalized.likes,
  };
}
