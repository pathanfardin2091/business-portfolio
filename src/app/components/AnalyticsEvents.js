"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { getElementLabel, pushAnalyticsEvent } from "./analytics";

const FILE_DOWNLOAD_PATTERN = /\.(pdf|docx?|xlsx?|pptx?|zip|rar|7z|csv|txt|mp4|mov|webm|jpg|jpeg|png|svg|webp)(\?.*)?$/i;
const SCROLL_MILESTONES = [25, 50, 75, 90];

function isLikelyCta(element) {
  const className = typeof element?.className === "string" ? element.className : "";

  return (
    element?.getAttribute("data-analytics-cta") === "true" ||
    /\brounded-full\b|\bbtn\b/i.test(className)
  );
}

export default function AnalyticsEvents() {
  const pathname = usePathname();
  const reachedScrollDepths = useRef(new Set());

  useEffect(() => {
    const pageUrl = window.location.href;

    const previousPageUrl = window.__fardesignLastPageViewUrl || "";

    if (previousPageUrl === pageUrl) {
      return;
    }

    pushAnalyticsEvent("page_view", {
      page_title: document.title,
      page_location: pageUrl,
      page_path: `${window.location.pathname}${window.location.search}`,
      page_referrer: previousPageUrl || document.referrer || "",
    });

    window.__fardesignLastPageViewUrl = pageUrl;
    reachedScrollDepths.current = new Set();
  }, [pathname]);

  useEffect(() => {
    const handleSubmit = (event) => {
      const form = event.target;

      pushAnalyticsEvent("contact_form_submit", {
        form_id: form.id || "",
        form_name: form.getAttribute("name") || "",
        form_label: form.getAttribute("aria-label") || "",
        page_location: window.location.href,
      });
    };

    const handleClick = (event) => {
      const target = event.target instanceof Element ? event.target : null;
      const analyticsElement = target?.closest("[data-analytics-event]");
      const link = target?.closest("a[href]");
      const button = target?.closest("button");

      if (analyticsElement) {
        pushAnalyticsEvent(analyticsElement.getAttribute("data-analytics-event"), {
          event_label: getElementLabel(analyticsElement),
          event_category: analyticsElement.getAttribute("data-analytics-category") || "engagement",
          item_id: analyticsElement.getAttribute("data-analytics-id") || "",
          item_name: analyticsElement.getAttribute("data-analytics-name") || "",
          link_url: link?.href || "",
          page_location: window.location.href,
        });
      }

      if (!link) {
        if (button && !analyticsElement) {
          pushAnalyticsEvent("cta_click", {
            event_label: getElementLabel(button),
            page_location: window.location.href,
          });
        }

        return;
      }

      const url = new URL(link.href, window.location.href);
      const href = link.getAttribute("href") || "";
      const linkParameters = {
        event_label: getElementLabel(link),
        link_url: link.href,
        link_domain: url.hostname,
        link_text: getElementLabel(link),
        page_location: window.location.href,
      };

      if (href.startsWith("mailto:")) {
        pushAnalyticsEvent("email_click", linkParameters);
        return;
      }

      if (href.startsWith("tel:")) {
        pushAnalyticsEvent("phone_click", linkParameters);
        return;
      }

      if (/wa\.me|whatsapp\.com/i.test(url.hostname)) {
        pushAnalyticsEvent("whatsapp_click", linkParameters);
        return;
      }

      if (FILE_DOWNLOAD_PATTERN.test(url.pathname)) {
        pushAnalyticsEvent("file_download", linkParameters);
        return;
      }

      if (url.origin !== window.location.origin) {
        pushAnalyticsEvent("external_link_click", linkParameters);
        return;
      }

      if (!analyticsElement && isLikelyCta(link)) {
        pushAnalyticsEvent("cta_click", linkParameters);
      }
    };

    const handleScroll = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;

      if (scrollableHeight <= 0) {
        return;
      }

      const scrollPercent = Math.round((window.scrollY / scrollableHeight) * 100);
      const nextMilestone = SCROLL_MILESTONES.find(
        (milestone) => scrollPercent >= milestone && !reachedScrollDepths.current.has(milestone)
      );

      if (!nextMilestone) {
        return;
      }

      reachedScrollDepths.current.add(nextMilestone);
      pushAnalyticsEvent("scroll_depth", {
        percent_scrolled: nextMilestone,
        page_location: window.location.href,
        page_path: `${window.location.pathname}${window.location.search}`,
      });
    };

    document.addEventListener("submit", handleSubmit, true);
    document.addEventListener("click", handleClick, true);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      document.removeEventListener("submit", handleSubmit, true);
      document.removeEventListener("click", handleClick, true);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const observedElements = new WeakSet();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || observedElements.has(entry.target)) {
            return;
          }

          observedElements.add(entry.target);
          pushAnalyticsEvent(entry.target.getAttribute("data-analytics-view"), {
            event_label: getElementLabel(entry.target),
            event_category: entry.target.getAttribute("data-analytics-category") || "engagement",
            item_id: entry.target.getAttribute("data-analytics-id") || "",
            item_name: entry.target.getAttribute("data-analytics-name") || "",
            page_location: window.location.href,
          });
        });
      },
      { threshold: 0.5 }
    );

    const observe = () => {
      document.querySelectorAll("[data-analytics-view]").forEach((element) => {
        observer.observe(element);
      });
    };

    observe();

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
