"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { projects } from "@/data/projects";

const services = [
  {
    title: "Packaging Design",
    description:
      "Strategic and visually appealing packaging that enhances shelf impact, communicates value, and builds brand recall.",
  },
  {
    title: "Logo Design",
    description:
      "Distinctive, timeless logos designed to represent your brand's personality and create instant recognition.",
  },
  {
    title: "Branding",
    description:
      "Complete brand systems crafted to define your voice, visuals, and positioning across every customer touchpoint.",
  },
  {
    title: "Motion Graphics",
    description:
      "Engaging motion visuals that simplify communication, boost attention, and bring your brand stories to life.",
  },
  {
    title: "UI & Product Design",
    description:
      "User-centric interfaces and digital product experiences designed for clarity, usability, and conversion.",
  },
  {
    title: "Video Editing",
    description:
      "High-quality edits optimized for storytelling, brand consistency, and performance across platforms.",
  },
  {
    title: "Social Media Design",
    description:
      "Scroll-stopping designs tailored to your audience, platforms, and marketing goals.",
  },
  {
    title: "Print & Digital Design",
    description:
      "Professionally designed assets for both print and digital use, ensuring consistency and visual impact.",
  },
  {
    title: "Website Development",
    description:
      "Clean, responsive websites built for speed, usability, and a professional brand presence.",
  },
];

const clientLogos = [
  "/clients/greengainz.png",
  "/clients/kundal.png",
  "/clients/atlas-mentor.png",
  "/clients/patel-classes.png",
  "/clients/supiato.png",
  "/clients/kaka.png",
  "/clients/jenny.png",
  "/clients/metalit.png",
];

const heroSlides = [
  {
    type: "video",
    src: "/hero/hire-morion-work.mp4",
    title: "Hire Morion Work",
  },
  // Add future slides here:
  { type: "image", src: "/hero/package.png", title: "Campaign banner" },
  // Use either local files or online links:
  // { type: "video", src: "/hero/another-video.mp4", title: "New work reel" },
  // { type: "video", src: "https://youtube.com/shorts/VIDEO_ID", title: "Social reel" },
];

export default function Home() {
  return (
    <>
      <HeroSlider slides={heroSlides} />

      <main className="flex min-h-[70vh] items-center justify-center bg-white px-6 py-28">
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-5xl text-center"
        >
          <h1 className="text-[42px] font-semibold leading-tight tracking-tight text-black sm:text-[56px]">
            We design meaningful brands
            <br className="hidden sm:block" /> &amp; digital experiences
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-gray-600">
            Helping businesses grow through thoughtful design, strong visual
            identity, and conversion-focused websites.
          </p>

          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#work"
              className="inline-block rounded-full bg-black px-7 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
            >
              View Work
            </a>

            <a
              href="#contact"
              className="inline-block rounded-full border border-black px-7 py-3 text-sm font-medium transition hover:bg-black hover:text-white"
            >
              Contact Me
            </a>
          </div>
        </motion.section>
      </main>

      <section id="services" className="scroll-mt-24 bg-white px-6 py-32">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-semibold tracking-tight text-black sm:text-4xl">
            Services
          </h2>

          <p className="mt-4 max-w-xl text-gray-600">
            We help brands and businesses stand out through thoughtful design
            and digital experiences.
          </p>

          <div className="mt-16 grid grid-cols-1 items-stretch gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: Math.min(index * 0.05, 0.25),
                  ease: "easeOut",
                }}
                viewport={{ once: true }}
                className="h-full w-full cursor-pointer rounded-2xl border border-gray-200 p-8 text-left transition duration-300 hover:-translate-y-1 hover:border-black"
              >
                <h3 className="text-xl font-medium text-black">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="work" className="scroll-mt-24 bg-white px-6 py-28">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-semibold tracking-tight text-black sm:text-4xl">
            Portfolio
          </h2>

          <p className="mt-4 max-w-xl text-gray-600">
            A glimpse of recent branding and design projects.
          </p>

          <div className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-2">
            {projects.slice(0, 2).map((project) => (
              <Link
                key={project.slug}
                href="/work"
                className="group cursor-pointer transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-2xl bg-gray-100">
                  <Image
                    src={project.thumbnail}
                    alt={project.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-contain"
                  />

                  <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-sm font-medium text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    Case study coming soon
                  </div>
                </div>

                <h3 className="mt-5 text-lg font-medium text-black transition-colors group-hover:text-gray-700">
                  {project.title}
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  {project.description}
                </p>
              </Link>
            ))}
          </div>

          <div className="mt-14 flex justify-center">
            <Link
              href="/work"
              className="rounded-full bg-black px-12 py-4 text-sm font-medium tracking-wide text-white transition hover:bg-gray-800"
            >
              View all projects -&gt;
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-32">
        <div className="mx-auto max-w-6xl">
          <h2 className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-center text-3xl font-semibold tracking-tight text-transparent sm:text-4xl">
            Clients I&apos;ve Worked With
          </h2>

          <div className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4">
            {clientLogos.map((logo) => (
              <div
                key={logo}
                className="flex h-[90px] items-center justify-center rounded-xl bg-[#f2f2f2] transition-all duration-300 hover:scale-[1.04]"
              >
                <Image
                  src={logo}
                  alt="Client logo"
                  width={160}
                  height={84}
                  className="max-h-[42px] w-auto max-w-[80%] object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-semibold tracking-tight text-black sm:text-4xl">
            Achievements
          </h2>

          <div className="mt-16 grid grid-cols-1 justify-items-center gap-12 sm:grid-cols-2 lg:grid-cols-3">
            <Achievement value="10+" label="Years of experience" />
            <Achievement value="50+" label="Projects completed" />
            <Achievement value="20+" label="Brands worked with" />
          </div>
        </div>
      </section>
    </>
  );
}

function Achievement({ value, label }) {
  return (
    <div className="w-full max-w-xs text-center">
      <p className="text-4xl font-semibold text-black">{value}</p>
      <p className="mt-2 text-sm text-gray-600">{label}</p>
    </div>
  );
}

function HeroSlider({ slides }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const previousSlide = (activeSlide - 1 + slides.length) % slides.length;
  const nextSlide = (activeSlide + 1) % slides.length;

  return (
    <section className="relative mt-16 h-[54svh] min-h-[300px] w-full overflow-hidden bg-black sm:h-[64svh] lg:mt-20 lg:h-[75vh] lg:min-h-[420px]">
      <div
        className="flex h-full w-full transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${activeSlide * 100}%)` }}
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
  const embedUrl = getHeroEmbedUrl(slide.src, {
    autoplay: isActive && !isPaused,
  });
  const isHostedVideo = slide.type === "video" && !embedUrl;

  useEffect(() => {
    const video = videoRef.current;

    if (!video || !isHostedVideo) {
      return;
    }

    video.muted = true;
    video.defaultMuted = true;
    video.volume = 1;

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
  }, [isActive, isHostedVideo, isPaused]);

  if (slide.type === "image") {
    return (
      <Image
        src={slide.src}
        alt={label}
        width={1920}
        height={1080}
        priority={priority}
        sizes="100vw"
        className="h-full w-full object-cover"
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
        src={slide.src}
        title={label}
        autoPlay
        loop
        playsInline
        controls={false}
        muted={false}
        preload={priority ? "auto" : "metadata"}
      />

      <button
        type="button"
        onClick={() => {
          if (needsUserPlay || isPaused) {
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
