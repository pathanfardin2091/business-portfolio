const ANALYTICS_DEBUG = process.env.NEXT_PUBLIC_ANALYTICS_DEBUG === "true";

export function pushAnalyticsEvent(eventName, parameters = {}) {
  if (typeof window === "undefined" || !eventName) {
    return;
  }

  window.dataLayer = window.dataLayer || [];

  const event = {
    event: eventName,
    event_source: "website",
    ...parameters,
  };

  window.dataLayer.push(event);

  if (ANALYTICS_DEBUG) {
    console.info("[analytics]", eventName, event);
  }
}

export function getElementLabel(element) {
  return (
    element?.getAttribute("data-analytics-label") ||
    element?.getAttribute("aria-label") ||
    element?.textContent?.trim().replace(/\s+/g, " ").slice(0, 120) ||
    element?.getAttribute("title") ||
    ""
  );
}