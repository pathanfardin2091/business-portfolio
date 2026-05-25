"use client";

const STORAGE_KEY = "fardesign-reel-engagement-v3";
const VIEWER_KEY = "fardesign-reel-viewer-id";
const SESSION_KEY = "fardesign-reel-session-id";
const VIEW_WINDOW_MS = 24 * 60 * 60 * 1000;
const MAX_DAILY_VIEWS_PER_REEL = 2;
const MEANINGFUL_SECONDS = 7;
const MEANINGFUL_PERCENT = 0.3;

const defaultMetrics = {
  views: 0,
  uniqueViews: 0,
  watchTime: 0,
  likes: 0,
  sessions: {},
  viewers: {},
  dailyViews: [],
};

export function createViewerIdentity() {
  if (typeof window === "undefined") {
    return { viewerId: "", sessionId: "", fingerprint: "" };
  }

  const viewerId = getOrCreateStorageId(window.localStorage, VIEWER_KEY);
  const sessionId = getOrCreateStorageId(window.sessionStorage, SESSION_KEY);
  const fingerprint = [
    navigator.language,
    navigator.platform,
    screen.width,
    screen.height,
    new Date().getTimezoneOffset(),
  ].join(":");

  return { viewerId, sessionId, fingerprint };
}

export function getInitialEngagement(videos) {
  return videos.reduce((engagement, video) => {
    engagement[video.id] = normalizeMetrics({
      views: video.startingViews || 0,
      uniqueViews: video.startingViews || 0,
      likes: video.startingLikes || 0,
    });

    return engagement;
  }, {});
}

export function loadStoredEngagement() {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

export function saveStoredEngagement(engagement) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(engagement));
}

export function mergeEngagement(baseEngagement, storedEngagement) {
  const merged = { ...baseEngagement };

  Object.entries(storedEngagement).forEach(([videoId, metrics]) => {
    merged[videoId] = normalizeMetrics({
      ...(merged[videoId] || defaultMetrics),
      ...metrics,
    });
  });

  return merged;
}

export function registerMeaningfulView(metrics, identity, watchState) {
  const now = Date.now();
  const current = normalizeMetrics(metrics);
  const recentViews = current.dailyViews.filter(
    (view) =>
      view.viewerId !== identity.viewerId || now - view.timestamp < VIEW_WINDOW_MS
  );
  const viewerViewsToday = recentViews.filter(
    (view) => view.viewerId === identity.viewerId
  ).length;

  if (viewerViewsToday >= MAX_DAILY_VIEWS_PER_REEL) {
    return { metrics: { ...current, dailyViews: recentViews }, counted: false };
  }

  const isUniqueViewer = !current.viewers[identity.viewerId];
  const next = normalizeMetrics({
    ...current,
    views: current.views + 1,
    uniqueViews: current.uniqueViews + (isUniqueViewer ? 1 : 0),
    watchTime: current.watchTime + Math.round(watchState.watchSeconds),
    viewers: {
      ...current.viewers,
      [identity.viewerId]: {
        firstSeenAt: current.viewers[identity.viewerId]?.firstSeenAt || now,
        fingerprint: identity.fingerprint,
      },
    },
    sessions: {
      ...current.sessions,
      [identity.sessionId]: {
        lastSeenAt: now,
        watchSeconds: Math.round(watchState.watchSeconds),
      },
    },
    dailyViews: [
      ...recentViews,
      {
        timestamp: now,
        viewerId: identity.viewerId,
        sessionId: identity.sessionId,
        fingerprint: identity.fingerprint,
      },
    ],
  });

  return { metrics: next, counted: true };
}

export function shouldCountView(watchSeconds, completionRate) {
  return watchSeconds >= MEANINGFUL_SECONDS || completionRate >= MEANINGFUL_PERCENT;
}

export function formatCompactNumber(value) {
  return Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value || 0);
}

function normalizeMetrics(metrics = {}) {
  return {
    ...defaultMetrics,
    ...metrics,
    sessions: metrics.sessions || {},
    viewers: metrics.viewers || {},
    dailyViews: metrics.dailyViews || [],
  };
}

function getOrCreateStorageId(storage, key) {
  const existing = storage.getItem(key);

  if (existing) {
    return existing;
  }

  const id =
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

  storage.setItem(key, id);
  return id;
}
