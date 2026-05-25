"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  createViewerIdentity,
  formatCompactNumber,
  getInitialEngagement,
  shouldCountView,
} from "./reelEngagement";

const LIKES_KEY = "fardesign-video-likes-v4";
const THEME_KEY = "fardesign-video-theme";
const skills = ["Motion Graphics", "Video Editing", "Branding"];

function getSavedLikes() {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    return JSON.parse(window.localStorage.getItem(LIKES_KEY) || "{}");
  } catch {
    return {};
  }
}

function getSavedTheme() {
  if (typeof window === "undefined") {
    return false;
  }

  return window.localStorage.getItem(THEME_KEY) === "dark";
}

function getYouTubeVideoId(embedUrl) {
  const embedMatch = embedUrl.match(/\/embed\/([^?&]+)/);
  const shortMatch = embedUrl.match(/youtu\.be\/([^?&]+)/);
  const watchMatch = embedUrl.match(/[?&]v=([^&]+)/);
  const shortsMatch = embedUrl.match(/\/shorts\/([^?&]+)/);

  return (
    embedMatch?.[1] ||
    shortMatch?.[1] ||
    watchMatch?.[1] ||
    shortsMatch?.[1] ||
    ""
  );
}

function getInstagramEmbedUrl(url) {
  const match = url.match(/instagram\.com\/(p|reel|tv)\/([^/?#]+)/);

  return match ? `https://www.instagram.com/${match[1]}/${match[2]}/embed` : "";
}

function getPinterestEmbedUrl(url) {
  const pinMatch = url.match(/pinterest\.[^/]+\/pin\/(\d+)/);

  return pinMatch
    ? `https://assets.pinterest.com/ext/embed.html?id=${pinMatch[1]}`
    : "";
}

function getVideoUrl(video) {
  return video.videoUrl || video.embedUrl || "";
}

function getEmbedUrl(video) {
  const url = getVideoUrl(video);
  const youtubeId = getYouTubeVideoId(url);

  if (youtubeId) {
    return `https://www.youtube-nocookie.com/embed/${youtubeId}`;
  }

  return getInstagramEmbedUrl(url) || getPinterestEmbedUrl(url) || url;
}

function getVideoProvider(video) {
  const url = getVideoUrl(video);

  if (getYouTubeVideoId(url)) {
    return "YouTube";
  }

  if (url.includes("instagram.com")) {
    return "Instagram";
  }

  if (url.includes("pinterest.") || url.includes("pin.it")) {
    return "Pinterest";
  }

  return "Video";
}

function getVideoThumbnail(video) {
  if (video.thumbnail) {
    return video.thumbnail;
  }

  const youtubeId = getYouTubeVideoId(getVideoUrl(video));

  return youtubeId ? `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg` : "";
}

function getVideoNumber(video) {
  const idMatch = video.id?.match(/\d+/);

  return idMatch ? Number(idMatch[0]) : 0;
}

export default function VideoShowcase({ videos }) {
  const heroRef = useRef(null);
  const viewerIdentity = useRef(null);
  const engagementLoadId = useRef(0);
  const likeActionId = useRef(0);
  const [isDark, setIsDark] = useState(getSavedTheme);
  const [userLikes, setUserLikes] = useState(getSavedLikes);
  const [engagement, setEngagement] = useState(() =>
    getInitialEngagement(videos)
  );
  const [pendingLikes, setPendingLikes] = useState({});
  const [activeIndex, setActiveIndex] = useState(null);
  const [sortOrder, setSortOrder] = useState("latest");
  const sortedVideos = useMemo(() => {
    return videos
      .filter((video) => getVideoUrl(video))
      .sort((firstVideo, secondVideo) => {
        const firstNumber = getVideoNumber(firstVideo);
        const secondNumber = getVideoNumber(secondVideo);

        return sortOrder === "latest"
          ? secondNumber - firstNumber
          : firstNumber - secondNumber;
      });
  }, [sortOrder, videos]);
  const activeVideo = activeIndex === null ? null : sortedVideos[activeIndex];

  useEffect(() => {
    viewerIdentity.current = createViewerIdentity();
    const videoIds = sortedVideos.map((video) => video.id).join(",");
    const currentLoadId = engagementLoadId.current + 1;
    const currentLikeActionId = likeActionId.current;

    engagementLoadId.current = currentLoadId;

    fetch(
      `/api/reels/engagement?ids=${encodeURIComponent(videoIds)}&viewerId=${encodeURIComponent(
        viewerIdentity.current.viewerId
      )}`,
      { cache: "no-store" }
    )
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (!data || currentLoadId !== engagementLoadId.current) {
          return;
        }

        setEngagement((current) => ({
          ...current,
          ...data.engagement,
        }));
        if (currentLikeActionId === likeActionId.current) {
          setUserLikes(data.likedVideos || {});
        }
      })
      .catch(() => {});
  }, [sortedVideos]);

  useEffect(() => {
    window.localStorage.setItem(LIKES_KEY, JSON.stringify(userLikes));
  }, [userLikes]);

  useEffect(() => {
    window.localStorage.setItem(THEME_KEY, isDark ? "dark" : "light");
  }, [isDark]);

  useEffect(() => {
    if (activeIndex === null) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setActiveIndex(null);
      }

      if (event.key === "ArrowRight") {
        setActiveIndex((currentIndex) =>
          currentIndex === null ? 0 : (currentIndex + 1) % sortedVideos.length
        );
      }

      if (event.key === "ArrowLeft") {
        setActiveIndex((currentIndex) =>
          currentIndex === null
            ? 0
            : (currentIndex - 1 + sortedVideos.length) % sortedVideos.length
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex, sortedVideos.length]);

  const getMetricsForVideo = (video) => engagement[video.id] || {};
  const getLikesForVideo = (video) => getMetricsForVideo(video).likes || 0;

  const toggleLike = async (videoId) => {
    if (!viewerIdentity.current || pendingLikes[videoId]) {
      return;
    }

    const hasAlreadyLiked = Boolean(userLikes[videoId]);
    const action = hasAlreadyLiked ? "unlike" : "like";
    const currentActionId = likeActionId.current + 1;

    likeActionId.current = currentActionId;
    setPendingLikes((currentPendingLikes) => ({
      ...currentPendingLikes,
      [videoId]: true,
    }));

    setUserLikes((currentLikes) => {
      const nextLikes = { ...currentLikes };

      if (hasAlreadyLiked) {
        delete nextLikes[videoId];
      } else {
        nextLikes[videoId] = true;
      }

      return nextLikes;
    });

    setEngagement((currentEngagement) => {
      const currentMetrics = currentEngagement[videoId] || {};

      return {
        ...currentEngagement,
        [videoId]: {
          ...currentMetrics,
          likes: Math.max(
            0,
            (currentMetrics.likes || 0) + (hasAlreadyLiked ? -1 : 1)
          ),
        },
      };
    });

    try {
      const response = await fetch("/api/reels/engagement", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action,
          videoId,
          ...viewerIdentity.current,
        }),
      });

      if (!response.ok) {
        throw new Error("Unable to update like.");
      }

      const data = await response.json();

      if (currentActionId !== likeActionId.current) {
        return;
      }

      setEngagement((currentEngagement) => ({
        ...currentEngagement,
        [videoId]: {
          ...currentEngagement[videoId],
          ...data.metrics,
        },
      }));
      setUserLikes((currentLikes) => {
        const nextLikes = { ...currentLikes };

        if (data.liked) {
          nextLikes[videoId] = true;
        } else {
          delete nextLikes[videoId];
        }

        return nextLikes;
      });
    } catch {
      if (currentActionId !== likeActionId.current) {
        return;
      }

      setUserLikes((currentLikes) => {
        const nextLikes = { ...currentLikes };

        if (hasAlreadyLiked) {
          nextLikes[videoId] = true;
        } else {
          delete nextLikes[videoId];
        }

        return nextLikes;
      });
      setEngagement((currentEngagement) => {
        const currentMetrics = currentEngagement[videoId] || {};

        return {
          ...currentEngagement,
          [videoId]: {
            ...currentMetrics,
            likes: Math.max(
              0,
              (currentMetrics.likes || 0) + (hasAlreadyLiked ? 1 : -1)
            ),
          },
        };
      });
    } finally {
      setPendingLikes((currentPendingLikes) => {
        const nextPendingLikes = { ...currentPendingLikes };
        delete nextPendingLikes[videoId];

        return nextPendingLikes;
      });
    }
  };

  const handleMeaningfulView = async (videoId, watchState) => {
    if (!viewerIdentity.current) {
      return false;
    }

    try {
      const response = await fetch("/api/reels/engagement", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "view",
          videoId,
          watchSeconds: watchState.watchSeconds,
          completionRate: watchState.completionRate,
          ...viewerIdentity.current,
        }),
      });

      if (!response.ok) {
        return false;
      }

      const data = await response.json();
      setEngagement((currentEngagement) => ({
        ...currentEngagement,
        [videoId]: {
          ...currentEngagement[videoId],
          ...data.metrics,
        },
      }));

      return Boolean(data.counted);
    } catch {
      return false;
    }
  };

  const goToVideo = (direction) => {
    setActiveIndex((currentIndex) => {
      if (currentIndex === null) {
        return 0;
      }

      return (currentIndex + direction + sortedVideos.length) % sortedVideos.length;
    });
  };

  return (
    <main
      className={`min-h-screen transition-colors duration-500 ${
        isDark ? "bg-[#05050b] text-white" : "bg-white text-black"
      }`}
    >
      <section
        ref={heroRef}
        className="relative isolate min-h-[680px] overflow-hidden bg-cover bg-center px-4 pb-20 pt-28 sm:px-6 sm:pb-24 sm:pt-32"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(10, 0, 18, 0.96) 0%, rgba(41, 0, 38, 0.82) 42%, rgba(41, 0, 38, 0.24) 100%), url('/video/fardin-hero.jpg')",
        }}
      >
        <div
          className={`absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t to-transparent ${
            isDark ? "from-[#05050b]" : "from-white"
          }`}
        />

        <div className="mx-auto flex min-h-[520px] max-w-6xl items-center">
          <div className="max-w-3xl">
            <button
              type="button"
              onClick={() => setIsDark((currentTheme) => !currentTheme)}
              className={`mb-8 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium backdrop-blur-xl transition ${
                isDark
                  ? "border-cyan-300/60 bg-cyan-300/10 text-cyan-200 shadow-lg shadow-cyan-500/20 hover:bg-cyan-300/20"
                  : "border-white/40 bg-white/10 text-white shadow-lg shadow-black/20 hover:bg-white/20"
              }`}
              aria-pressed={isDark}
            >
              <ThemeIcon isDark={isDark} />
              {isDark ? "Neon mode" : "Dark mode"}
            </button>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-sm font-medium uppercase tracking-[0.22em] ${
                isDark ? "text-cyan-300" : "text-white/70"
              }`}
            >
              Video Portfolio
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className={`mt-5 text-5xl font-semibold tracking-tight sm:text-7xl ${
                isDark
                  ? "bg-gradient-to-r from-cyan-300 via-lime-200 to-fuchsia-300 bg-clip-text text-transparent"
                  : "text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.45)]"
              }`}
            >
              Fardin Pathan
            </motion.h1>

            <div className="mt-8 flex min-h-24 flex-wrap items-start gap-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill}
                  drag
                  dragConstraints={heroRef}
                  dragElastic={0.18}
                  dragMomentum={false}
                  dragSnapToOrigin
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.16 + index * 0.08 }}
                  className={`cursor-grab select-none rounded-full border px-5 py-3 text-sm font-medium shadow-lg backdrop-blur-xl active:cursor-grabbing ${
                    isDark
                      ? "border-cyan-200/30 bg-white/10 text-cyan-100 shadow-cyan-500/20"
                      : "border-white/45 bg-white/[0.12] text-white shadow-black/20"
                  }`}
                >
                  {skill}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2
              className={`text-3xl font-semibold tracking-tight sm:text-4xl ${
                isDark ? "text-lime-200" : ""
              }`}
            >
              All of my works
            </h2>
            <p
              className={`mt-3 max-w-xl text-sm leading-6 ${
                isDark ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Click any reel to open it. The full title, description, and like
              controls appear inside the overlay.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div
              className={`flex rounded-full border p-1 ${
                isDark
                  ? "border-cyan-300/30 bg-white/[0.04]"
                  : "border-gray-200 bg-gray-50"
              }`}
              aria-label="Sort videos"
              role="group"
            >
              {["latest", "oldest"].map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    setSortOrder(option);
                    setActiveIndex(null);
                  }}
                  className={`rounded-full px-4 py-2 text-sm font-medium capitalize transition ${
                    sortOrder === option
                      ? isDark
                        ? "bg-cyan-300 text-black"
                        : "bg-black text-white"
                      : isDark
                        ? "text-cyan-100 hover:bg-white/10"
                        : "text-gray-600 hover:bg-white"
                  }`}
                  aria-pressed={sortOrder === option}
                >
                  {option}
                </button>
              ))}
            </div>

            <p
              className={isDark ? "text-sm text-cyan-300" : "text-sm text-gray-500"}
            >
              {sortedVideos.length} videos
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sortedVideos.map((video, index) => (
            <VideoCard
              key={video.id}
              video={video}
              isDark={isDark}
              hasLiked={Boolean(userLikes[video.id])}
              likes={getLikesForVideo(video)}
              metrics={getMetricsForVideo(video)}
              isLikePending={Boolean(pendingLikes[video.id])}
              onOpen={() => setActiveIndex(index)}
              onToggleLike={() => toggleLike(video.id)}
            />
          ))}
        </div>
      </section>

      <VideoOverlay
        video={activeVideo}
        isDark={isDark}
        hasLiked={activeVideo ? Boolean(userLikes[activeVideo.id]) : false}
        likes={activeVideo ? getLikesForVideo(activeVideo) : 0}
        metrics={activeVideo ? getMetricsForVideo(activeVideo) : {}}
        isLikePending={activeVideo ? Boolean(pendingLikes[activeVideo.id]) : false}
        onClose={() => setActiveIndex(null)}
        onPrevious={() => goToVideo(-1)}
        onNext={() => goToVideo(1)}
        onToggleLike={() => activeVideo && toggleLike(activeVideo.id)}
        onMeaningfulView={handleMeaningfulView}
      />
    </main>
  );
}

function VideoCard({
  video,
  isDark,
  hasLiked,
  likes,
  metrics,
  isLikePending,
  onOpen,
  onToggleLike,
}) {
  const thumbnail = getVideoThumbnail(video);
  const provider = getVideoProvider(video);

  return (
    <article
      className={`overflow-hidden rounded-2xl border shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl ${
        isDark
          ? "border-cyan-300/20 bg-white/[0.04] shadow-cyan-500/10 hover:border-cyan-300/50 hover:shadow-cyan-500/20"
          : "border-gray-200 bg-white"
      }`}
    >
      <button
        type="button"
        onClick={onOpen}
        className="group block w-full text-left"
      >
        <div
          className={`relative overflow-hidden bg-black bg-cover bg-center ${
            video.ratio === "landscape" ? "aspect-video" : "aspect-[9/16]"
          }`}
          style={thumbnail ? { backgroundImage: `url(${thumbnail})` } : undefined}
        >
          {!thumbnail ? (
            <div
              className={`absolute inset-0 ${
                isDark
                  ? "bg-gradient-to-br from-[#1d1426] via-[#171018] to-[#4d3b1f]"
                  : "bg-gradient-to-br from-gray-900 via-gray-700 to-gray-950"
              }`}
            />
          ) : null}
          <div className="absolute inset-0 bg-black/20 transition group-hover:bg-black/50" />
          <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-black">
            {provider}
          </div>
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition group-hover:opacity-100">
            <span className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-black">
              Play
            </span>
          </div>
        </div>
      </button>

      <div className="flex items-start justify-between gap-4 p-4">
        <button
          type="button"
          onClick={onOpen}
          className="min-w-0 flex-1 text-left"
        >
          <span
            className={`block text-base font-semibold ${
              isDark ? "text-cyan-100" : ""
            }`}
          >
            {video.title}
          </span>
          <span
            className={
              isDark
                ? "mt-1 block text-sm text-fuchsia-200"
                : "mt-1 block text-sm text-gray-500"
            }
          >
            {video.type}
          </span>
        </button>

        <EngagementRow
          hasLiked={hasLiked}
          isDark={isDark}
          likes={likes}
          views={metrics.views}
          disabled={isLikePending}
          onToggleLike={onToggleLike}
        />
      </div>
    </article>
  );
}

function VideoOverlay({
  video,
  isDark,
  hasLiked,
  likes,
  metrics,
  isLikePending,
  onClose,
  onPrevious,
  onNext,
  onToggleLike,
  onMeaningfulView,
}) {
  return (
    <AnimatePresence>
      {video ? (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/85 px-4 py-6 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 z-10 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-xl transition hover:bg-white hover:text-black"
            aria-label="Close video"
          >
            Cancel
          </button>

          <OverlayArrow label="Previous reel" side="left" onClick={onPrevious}>
            &lt;
          </OverlayArrow>
          <OverlayArrow label="Next reel" side="right" onClick={onNext}>
            &gt;
          </OverlayArrow>

          <motion.div
            key={video.id}
            initial={{ opacity: 0, scale: 0.96, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 18 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="grid max-h-[calc(100vh-6rem)] w-full max-w-5xl grid-cols-1 gap-4 overflow-y-auto lg:grid-cols-[minmax(0,430px)_minmax(280px,1fr)] lg:overflow-visible"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mx-auto w-full max-w-[430px]">
              <div
                className={`overflow-hidden rounded-2xl bg-black shadow-2xl ${
                  isDark ? "shadow-cyan-500/30 ring-1 ring-cyan-300/30" : ""
                }`}
              >
                <div
                  className={
                    video.ratio === "landscape"
                      ? "aspect-video"
                      : "aspect-[9/16]"
                  }
                >
                  <TrackedEmbed
                    key={video.id}
                    video={video}
                    onMeaningfulView={onMeaningfulView}
                  />
                </div>
              </div>
            </div>

            <aside className="flex min-h-[260px] flex-col justify-between rounded-2xl border border-white/10 bg-white/10 p-5 text-white backdrop-blur-xl lg:min-h-full">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/50">
                  {video.type}
                </p>
                <h3 className="mt-3 text-2xl font-semibold leading-tight">
                  {video.title}
                </h3>

                {video.description ? (
                  <p className="mt-4 text-sm leading-6 text-white/70">
                    {video.description}
                  </p>
                ) : null}

              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <EngagementRow
                  hasLiked={hasLiked}
                  isDark
                  likes={likes}
                  views={metrics.views}
                  disabled={isLikePending}
                  onToggleLike={onToggleLike}
                />
              </div>
            </aside>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function TrackedEmbed({ video, onMeaningfulView }) {
  const [watchSeconds, setWatchSeconds] = useState(0);
  const [viewProcessed, setViewProcessed] = useState(false);
  const viewRequestStarted = useRef(false);
  const duration = video.durationSeconds || (video.ratio === "landscape" ? 60 : 25);
  const completionRate = Math.min(watchSeconds / duration, 1);
  const src = `${getEmbedUrl(video)}?autoplay=1&mute=1&playsinline=1&rel=0&modestbranding=1`;

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setWatchSeconds((currentSeconds) => Math.min(currentSeconds + 1, duration));
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [duration, video.id]);

  useEffect(() => {
    if (
      viewProcessed ||
      viewRequestStarted.current ||
      !shouldCountView(watchSeconds, completionRate)
    ) {
      return;
    }

    let isCancelled = false;
    viewRequestStarted.current = true;

    onMeaningfulView(video.id, {
      watchSeconds,
      completionRate,
    }).finally(() => {
      if (!isCancelled) {
        setViewProcessed(true);
      }
    });

    return () => {
      isCancelled = true;
    };
  }, [completionRate, duration, onMeaningfulView, video.id, viewProcessed, watchSeconds]);

  return (
    <div className="relative h-full w-full bg-black">
      <iframe
        className="h-full w-full"
        src={src}
        title={video.title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/75 to-transparent" />
      <div className="pointer-events-none absolute inset-x-4 bottom-4">
        <div className="h-1.5 overflow-hidden rounded-full bg-white/20">
          <motion.div
            className="h-full rounded-full bg-white"
            animate={{ width: `${completionRate * 100}%` }}
            transition={{ duration: 0.25 }}
          />
        </div>
      </div>
    </div>
  );
}

function EngagementRow({ disabled, hasLiked, isDark, likes, views, onToggleLike }) {
  return (
    <div className="flex shrink-0 items-center gap-2">
      <ViewPill isDark={isDark} views={views} />
      <EngagementButton
        hasLiked={hasLiked}
        isDark={isDark}
        likes={likes}
        disabled={disabled}
        onToggleLike={onToggleLike}
      />
    </div>
  );
}

function ViewPill({ isDark, views }) {
  return (
    <div
      className={`flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-medium ${
        isDark
          ? "border-cyan-300/40 bg-cyan-300/10 text-cyan-100"
          : "border-gray-300 bg-white text-black"
      }`}
      aria-label={`${views || 0} views`}
    >
      <EyeIcon />
      <motion.span
        key={views}
        initial={{ y: -4, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        {formatCompactNumber(views)}
      </motion.span>
    </div>
  );
}

function EngagementButton({ disabled, hasLiked, isDark, likes, onToggleLike }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onToggleLike}
      aria-label={hasLiked ? "Unlike video" : "Like video"}
      className={`flex shrink-0 items-center gap-2 rounded-full border px-3 py-2 text-sm font-medium transition active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 ${
        hasLiked
          ? "border-red-500 bg-red-500 text-white"
          : isDark
            ? "border-cyan-300/40 bg-cyan-300/10 text-cyan-100 hover:border-cyan-200 hover:bg-cyan-300/20"
            : "border-gray-300 bg-white text-black hover:border-black"
      }`}
    >
      <HeartIcon filled={hasLiked} />
      <motion.span
        key={likes}
        initial={{ y: -4, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        {formatCompactNumber(likes)}
      </motion.span>
    </button>
  );
}

function OverlayArrow({ children, label, side, onClick }) {
  return (
    <button
      type="button"
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}
      aria-label={label}
      className={`absolute top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-xl font-semibold text-white backdrop-blur-xl transition hover:bg-white hover:text-black ${
        side === "left" ? "left-3 sm:left-8" : "right-3 sm:right-8"
      }`}
    >
      {children}
    </button>
  );
}

function ThemeIcon({ isDark }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {isDark ? (
        <path d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.36-6.36-1.42 1.42M7.06 16.94l-1.42 1.42m12.72 0-1.42-1.42M7.06 7.06 5.64 5.64M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
      ) : (
        <path d="M21 12.8A8.5 8.5 0 1 1 11.2 3a6.5 6.5 0 0 0 9.8 9.8z" />
      )}
    </svg>
  );
}

function HeartIcon({ filled }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
