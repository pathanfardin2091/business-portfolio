"use client";

import { motion } from "framer-motion";
import Navbar from "./components/Navbar";
import { projects } from "@/data/projects";




export default function Home() {
  return (
    <>
      <Navbar />

      {/* HERO */}
      <main className="min-h-screen bg-white flex items-center justify-center px-6 pt-32">
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-5xl text-center"
        >
          <h1 className="text-[42px] sm:text-[56px] leading-tight font-semibold tracking-tight text-black">
            I design meaningful brands
            <br className="hidden sm:block" />
            & digital experiences
          </h1>

          <p className="mt-8 max-w-2xl mx-auto text-lg leading-relaxed text-gray-600">
            Helping businesses grow through thoughtful design, strong visual
            identity, and conversion-focused websites.
          </p>

          <div className="mt-12 flex items-center justify-center gap-4">
            <button className="px-7 py-3 rounded-full bg-black text-white text-sm font-medium hover:bg-gray-800 transition">
              View Work
            </button>

            <button className="px-7 py-3 rounded-full border border-black text-sm font-medium hover:bg-black hover:text-white transition">
              Contact Me
            </button>
          </div>
        </motion.section>
      </main>

     {/* SERVICES */}
<section id="services" className="bg-white px-6 py-28">
  <div className="max-w-6xl mx-auto">
    <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-black">
      Services
    </h2>

    <p className="mt-4 max-w-xl text-gray-600">
      I help brands and businesses stand out through thoughtful design
      and digital experiences.
    </p>

    {/* GRID – ONLY ONCE */}
    <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 items-stretch">

      {/* Card 1 */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.05, ease: "easeOut" }}
        viewport={{ once: true }}
        className="w-full h-full text-left border border-gray-200 rounded-2xl p-8 hover:border-black transition group cursor-pointer transition-transform duration-300 hover:-translate-y-1"
      >
        <h3 className="text-xl font-medium text-black">
          Brand Identity
        </h3>
        <p className="mt-3 text-gray-600 text-sm leading-relaxed">
          Logo design, visual identity systems, and brand guidelines
          that create a strong first impression.
        </p>
      </motion.div>

      {/* Card 2 */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
        viewport={{ once: true }}
        className="w-full h-full text-left border border-gray-200 rounded-2xl p-8 hover:border-black transition group cursor-pointer transition-transform duration-300 hover:-translate-y-1"
      >
        <h3 className="text-xl font-medium text-black">
          Website Design
        </h3>
        <p className="mt-3 text-gray-600 text-sm leading-relaxed">
          Clean, modern, and conversion-focused websites built for
          performance and clarity.
        </p>
      </motion.div>

      {/* Card 3 */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
        viewport={{ once: true }}
        className="w-full h-full text-left border border-gray-200 rounded-2xl p-8 hover:border-black transition group cursor-pointer transition-transform duration-300 hover:-translate-y-1"
      >
        <h3 className="text-xl font-medium text-black">
          UI & Product Design
        </h3>
        <p className="mt-3 text-gray-600 text-sm leading-relaxed">
          Intuitive interfaces and product experiences designed to
          improve usability and engagement.
        </p>
      </motion.div>

    </div>
  </div>
</section>

{/* SELECTED WORK */}
<section className="bg-white px-6 py-28">
  <div className="max-w-6xl mx-auto">

    <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-black">
      Selected Work
    </h2>

    <p className="mt-4 max-w-xl text-gray-600">
      A glimpse of recent branding and design projects.
    </p>

    <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-12">
      {projects.slice(0, 2).map((project) => (
  <a
    key={project.slug}
    href="/work"
    className="group cursor-pointer transition-transform duration-300 hover:-translate-y-1"
  >
    <div className="w-full aspect-[4/3] rounded-2xl bg-gray-100 overflow-hidden flex items-center justify-center ">
      <img
        src={project.thumbnail}
        alt={project.title}
        className="max-w-full max-h-full object-contain"
      />
    </div>

    <h3 className="mt-5 text-lg font-medium text-black transition-colors group-hover:text-gray-700">
      {project.title}
    </h3>

    <p className="mt-1 text-sm text-gray-600">
      {project.description}
    </p>
  </a>
))}

    </div>

  </div>
</section>



<div className=" px-5 py-5 flex justify-self-center">
  <a
    href="/work"
    className="
      px-16 py-5
      text-sm font-medium tracking-wide
      text-white
      rounded-full
      border-2 border-transparent
      hover:border-white
      transition-all duration-300
    "
  >
    View all projects →
  </a>
</div>






{/* TESTIMONIALS */}
<section className="bg-white px-6 py-28">
  <div className="max-w-6xl mx-auto">
    <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-black text-center">
      What clients say
    </h2>

    <p className="mt-4 max-w-xl mx-auto text-center text-gray-600">
      Trusted by businesses and startups for quality design and clear
      communication.
    </p>

    <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
      
      {/* Testimonial 1 */}
      
      <motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, ease: "easeOut" }}
  viewport={{ once: true }}
  className="border border-gray-200 rounded-2xl p-8"
>
  <p className="text-gray-700 leading-relaxed">
    “The branding work was clean, thoughtful, and exactly what we
    needed. Communication was smooth and delivery was on point.”
  </p>

  <div className="mt-6">
    <p className="font-medium text-black">Rahul Mehta</p>
    <p className="text-sm text-gray-500">Startup Founder</p>
  </div>
</motion.div>

      {/* Testimonial 2 */}
    <motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, ease: "easeOut" }}
  viewport={{ once: true }}
  className="border border-gray-200 rounded-2xl p-8"
>
  <p className="text-gray-700 leading-relaxed">
          “Very professional approach. The packaging design elevated our
          product and helped us stand out in the market.”
        </p>

        <div className="mt-6">
          <p className="font-medium text-black">Ayesha Khan</p>
          <p className="text-sm text-gray-500">Brand Manager</p>
        </div>
</motion.div>

        
      

      {/* Testimonial 3 */}
      <motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, ease: "easeOut" }}
  viewport={{ once: true }}
  className="border border-gray-200 rounded-2xl p-8"
>
  <p className="text-gray-700 leading-relaxed">
          “Great design sense and attention to detail. Highly recommend
          for branding and UI work.”
        </p>

        <div className="mt-6">
          <p className="font-medium text-black">Kunal Verma</p>
          <p className="text-sm text-gray-500">Product Lead</p>
        </div>
</motion.div>

        
      


    </div>
  </div>
</section>


{/* TRUST SIGNALS */}
<section className="bg-white px-6 py-24">
  <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-12 text-center">

    <div>
      <p className="text-4xl font-semibold text-black">4+</p>
      <p className="mt-2 text-sm text-gray-600">Years of experience</p>
    </div>

    <div>
      <p className="text-4xl font-semibold text-black">50+</p>
      <p className="mt-2 text-sm text-gray-600">Projects completed</p>
    </div>

    <div>
      <p className="text-4xl font-semibold text-black">100%</p>
      <p className="mt-2 text-sm text-gray-600">Client satisfaction</p>
    </div>

  </div>
</section>


{/* CTA / CONTACT */}
<section id="contact" className="bg-black px-6 py-28">
  <div className="max-w-5xl mx-auto text-center">

    <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">
      Let’s build a brand people remember
    </h2>

    <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-300">
      Branding, packaging & digital design for startups and growing businesses.
      Clear communication. Clean design. Real results.
    </p>

    <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
      
      {/* Primary CTA */}
      <a
        href="mailto:fardesiggns@gmail.com?subject=New%20Project%20Inquiry"
        className="px-10 py-4 rounded-full bg-white text-black text-sm font-medium
                   hover:bg-gray-200 transition"
      >
        Start a project
      </a>


      {/* WhatsApp CTA */}
  <a
    href="https://api.whatsapp.com/send?phone=917559407818&text=Hi%20I%20want%20to%20discuss%20a%20project"
    target="_blank"
    rel="noopener noreferrer"
    className="px-10 py-4 rounded-full border border-green-500 text-green-400
               text-sm font-medium hover:bg-green-500 hover:text-black transition"
  >
    Chat on WhatsApp
  </a>

      {/* Secondary CTA */}
      <a
        href="/work"
        className="px-10 py-4 rounded-full border border-white/60 text-white
                   text-sm font-medium hover:bg-white hover:text-black transition"
      >
        View work
      </a>

    </div>

    {/* Trust line */}
    <p className="mt-8 text-sm text-gray-400">
      Typically replies within 1 hours
    </p>

  </div>
</section>


{/* FOOTER */}
<footer className="bg-white px-6 py-16 border-t border-gray-200">
  <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
    
    {/* Left */}
    <p className="text-sm text-gray-500">
      © {new Date().getFullYear()} YourBrand. All rights reserved.
    </p>

    {/* Right */}
    <div className="flex items-center gap-6 text-sm text-gray-600">
      <a href="/work" className="hover:text-black transition">
        Work
      </a>
      <a href="#services" className="hover:text-black transition">
        Services
      </a>
      <a
        href="mailto:fardesiggns@gmail.com"
        className="hover:text-black transition"
      >
        Contact
      </a>
    </div>

  </div>
</footer>


    </>
  );
}
