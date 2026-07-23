"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

export default function HeroSlider({ slides }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const previousSlide = (activeSlide - 1 + slides.length) % slides.length;
  const nextSlide = (activeSlide + 1) % slides.length;

  return (
    <section className="relative mt-16 h-[54svh] min-h-[300px] w-full overflow-hidden bg-black sm:h-[64svh] lg:mt-20 lg:h-[75vh] lg:min-h-[420px]">
      <div
        className="flex h-full w-full transition-transform duration-500 ease-out will-change-transform"
        style={{ transform: `translate3d(-${activeSlide * 100}%, 0, 0)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={`${slide.src}-${index}`}
            className="relative h-full w-full flex-none"
          >
            <HeroSlide
              slide={slide}
              priority={index === 0}
              isActive={index === activeSlide}
            />
          </div>
        ))}
      </div>

      {slides.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => setActiveSlide(previousSlide)}
            aria-label="Previous hero slide"
            className="absolute left-5 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-2xl leading-none text-black shadow-lg transition hover:bg-white"
          >
            &#8249;
          </button>

          <button
            type="button"
            onClick={() => setActiveSlide(nextSlide)}
            aria-label="Next hero slide"
            className="absolute right-5 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-2xl leading-none text-black shadow-lg transition hover:bg-white"
          >
            &#8250;
          </button>

          <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-2">
            {slides.map((slide, index) => (
              <button
                key={`${slide.src}-dot-${index}`}
                type="button"
                onClick={() => setActiveSlide(index)}
                aria-label={`Go to hero slide ${index + 1}`}
                className={`h-2.5 rounded-full transition-all ${
                  index === activeSlide ? "w-8 bg-white" : "w-2.5 bg-white/55"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}

function HeroSlide({ slide, priority, isActive }) {
  const assetLabel = slide.alt || slide.title || "Hero media";

  return (
    <div className="relative h-full w-full overflow-hidden">
      <SharpAsset
        slide={slide}
        priority={priority}
        label={assetLabel}
        isActive={isActive}
      />
    </div>
  );
}

function SharpAsset({ slide, priority, label, isActive }) {
  const videoRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [needsUserPlay, setNeedsUserPlay] = useState(false);
  const [volumePercent, setVolumePercent] = useState(0);
  const [hasAdjustedVolume, setHasAdjustedVolume] = useState(false);
  const [showVolumeHint, setShowVolumeHint] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(!isDirectVideoUrl(slide.src));
  const embedUrl = useMemo(
    () =>
      getHeroEmbedUrl(slide.src, {
        autoplay: isActive && !isPaused,
      }),
    [isActive, isPaused, slide.src],
  );
  const isHostedVideo = slide.type === "video" && !embedUrl;

  useEffect(() => {
    if (!isHostedVideo || !isActive || shouldLoadVideo) {
      return;
    }

    const loadVideo = () => setShouldLoadVideo(true);
    const timeoutId = window.setTimeout(loadVideo, 1200);
    const idleId =
      "requestIdleCallback" in window
        ? window.requestIdleCallback(loadVideo, { timeout: 1800 })
        : 0;

    return () => {
      window.clearTimeout(timeoutId);
      if (idleId && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
    };
  }, [isActive, isHostedVideo, shouldLoadVideo]);

  useEffect(() => {
    const video = videoRef.current;
    const volume = volumePercent / 100;

    if (!video || !isHostedVideo || !shouldLoadVideo) {
      return;
    }

    video.volume = volume;
    video.muted = volume === 0;
    video.defaultMuted = true;

    if (!isActive || isPaused) {
      video.pause();
      return;
    }

    const playPromise = video.play();

    if (playPromise) {
      playPromise
        .then(() => setNeedsUserPlay(false))
        .catch(() => setNeedsUserPlay(true));
    }
  }, [isActive, isHostedVideo, isPaused, shouldLoadVideo, volumePercent]);

  useEffect(() => {
    const savedVolume = window.localStorage.getItem("heroVideoVolume");

    if (savedVolume === null) {
      return;
    }

    const parsedVolume = Number(savedVolume);
    const nextVolume = Math.min(100, Math.max(0, parsedVolume));

    if (Number.isFinite(parsedVolume)) {
      const restoreVolume = window.setTimeout(() => {
        setVolumePercent(nextVolume);
        setHasAdjustedVolume(true);
      }, 0);

      return () => window.clearTimeout(restoreVolume);
    }
  }, []);

  useEffect(() => {
    if (!isHostedVideo || hasAdjustedVolume || volumePercent > 0) {
      return;
    }

    let hintTimeout;
    const hintInterval = window.setInterval(() => {
      setShowVolumeHint(true);
      hintTimeout = window.setTimeout(() => setShowVolumeHint(false), 900);
    }, 8000);

    return () => {
      window.clearInterval(hintInterval);
      window.clearTimeout(hintTimeout);
    };
  }, [hasAdjustedVolume, isHostedVideo, volumePercent]);

  if (slide.type === "image") {
    return (
      <Image
        src={slide.src}
        alt={label}
        fill
        priority={priority}
        sizes="100vw"
        className="object-cover"
      />
    );
  }

  if (embedUrl) {
    return (
      <>
        <iframe
          className="absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[177.777778vh] min-w-full -translate-x-1/2 -translate-y-1/2 border-0"
          src={embedUrl}
          title={label}
          loading={priority ? "eager" : "lazy"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/45 to-transparent" />

        <div className="absolute bottom-5 right-5 z-10 flex gap-2">
          <a
            href={slide.src}
            target="_blank"
            rel="noreferrer"
            className="flex h-11 items-center justify-center rounded-full bg-white/90 px-4 text-sm font-medium text-black shadow-lg transition hover:bg-white"
          >
            Open
          </a>
          <button
            type="button"
            onClick={() => setIsPaused((currentPaused) => !currentPaused)}
            aria-label={isPaused ? "Play hero video" : "Pause hero video"}
            className="flex h-11 min-w-11 items-center justify-center rounded-full bg-white/90 px-4 text-sm font-medium text-black shadow-lg transition hover:bg-white"
          >
            {isPaused ? "Play" : "Pause"}
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        src={shouldLoadVideo ? slide.src : undefined}
        title={label}
        autoPlay
        loop
        playsInline
        controls={false}
        muted={volumePercent === 0}
        preload="none"
        poster={slide.poster}
      />

      <label
        className={`absolute bottom-5 left-5 z-10 flex h-10 w-36 items-center gap-2 rounded-full bg-white/90 px-3 text-xs font-medium text-black shadow-lg transition duration-300 hover:bg-white sm:w-44 ${
          showVolumeHint ? "scale-105 shadow-white/50 ring-2 ring-white/60" : ""
        }`}
      >
        <span className="shrink-0">Vol</span>
        <input
          type="range"
          min="0"
          max="100"
          value={volumePercent}
          onChange={(event) => {
            const nextVolume = Number(event.target.value);
            setHasAdjustedVolume(true);
            setShowVolumeHint(false);
            setVolumePercent(nextVolume);
            window.localStorage.setItem("heroVideoVolume", String(nextVolume));
          }}
          aria-label="Hero video volume"
          className="h-1 min-w-0 flex-1 cursor-pointer accent-black"
        />
        <span className="w-7 text-right tabular-nums">{volumePercent}%</span>
      </label>

      <button
        type="button"
        onClick={() => {
          if (needsUserPlay || isPaused) {
            setShouldLoadVideo(true);
            setIsPaused(false);
            videoRef.current?.play()?.catch(() => setNeedsUserPlay(true));
            return;
          }

          setNeedsUserPlay(false);
          setIsPaused(true);
        }}
        aria-label={
          isPaused || needsUserPlay ? "Play hero video" : "Pause hero video"
        }
        className="absolute bottom-5 right-5 z-10 flex h-11 min-w-11 items-center justify-center rounded-full bg-white/90 px-4 text-sm font-medium text-black shadow-lg transition hover:bg-white"
      >
        {isPaused || needsUserPlay ? "Play" : "Pause"}
      </button>
    </>
  );
}

function getHeroEmbedUrl(src, { autoplay }) {
  if (!src || src.startsWith("/") || isDirectVideoUrl(src)) {
    return "";
  }

  const youtubeId = getYouTubeVideoId(src);

  if (youtubeId) {
    const params = new URLSearchParams({
      autoplay: autoplay ? "1" : "0",
      controls: "0",
      loop: "1",
      mute: "1",
      playsinline: "1",
      rel: "0",
      modestbranding: "1",
      playlist: youtubeId,
    });

    return `https://www.youtube-nocookie.com/embed/${youtubeId}?${params}`;
  }

  const vimeoId = getVimeoVideoId(src);

  if (vimeoId) {
    const params = new URLSearchParams({
      autoplay: autoplay ? "1" : "0",
      background: "1",
      loop: "1",
      muted: "1",
      playsinline: "1",
    });

    return `https://player.vimeo.com/video/${vimeoId}?${params}`;
  }

  const instagramUrl = getInstagramEmbedUrl(src);

  if (instagramUrl) {
    return instagramUrl;
  }

  const pinterestUrl = getPinterestEmbedUrl(src);

  if (pinterestUrl) {
    return pinterestUrl;
  }

  return "";
}

function isDirectVideoUrl(src) {
  return /\.(mp4|webm|ogg|ogv)(\?.*)?$/i.test(src);
}

function getYouTubeVideoId(url) {
  const embedMatch = url.match(/\/embed\/([^?&/]+)/);
  const shortMatch = url.match(/youtu\.be\/([^?&/]+)/);
  const watchMatch = url.match(/[?&]v=([^&/]+)/);
  const shortsMatch = url.match(/\/shorts\/([^?&/]+)/);

  return (
    embedMatch?.[1] ||
    shortMatch?.[1] ||
    watchMatch?.[1] ||
    shortsMatch?.[1] ||
    ""
  );
}

function getVimeoVideoId(url) {
  const match = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);

  return match?.[1] || "";
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
