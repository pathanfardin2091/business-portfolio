"use client";

const VIEWER_KEY = "fardesign-reel-viewer-id";
const SESSION_KEY = "fardesign-reel-session-id";
const MEANINGFUL_SECONDS = 7;
const MEANINGFUL_PERCENT = 0.3;

const defaultMetrics = {
  views: 0,
  uniqueViews: 0,
  watchTime: 0,
  likes: 0,
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
