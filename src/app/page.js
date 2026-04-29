"use client";

import Image from "next/image";
import Link from "next/link";
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

export default function Home() {
  return (
    <>
      <main className="flex min-h-screen items-center justify-center bg-white px-6 pt-32">
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

          <div className="mt-12 flex items-center justify-center gap-4">
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
