"use client";

import { motion } from "framer-motion";

import { projects } from "@/data/projects";




export default function Home() {
  return (
    <>
      

      {/* HERO */}
      <main className="min-h-screen bg-white flex items-center justify-center px-6 pt-32">
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-5xl text-center"
        >
          <h1 className="text-[42px] sm:text-[56px] leading-tight font-semibold tracking-tight text-black">
            We design meaningful brands
            <br className="hidden sm:block" />
            & digital experiences
          </h1>

          <p className="mt-8 max-w-2xl mx-auto text-lg leading-relaxed text-gray-600">
            Helping businesses grow through thoughtful design, strong visual
            identity, and conversion-focused websites.
          </p>

          <div className="mt-12 flex items-center justify-center gap-4">
            <a
  href="#work"
  className="px-7 py-3 rounded-full bg-black text-white text-sm font-medium hover:bg-gray-800 transition inline-block"
>
  View Work
</a>


          <a
  href="#contact"
  className="px-7 py-3 rounded-full border border-black text-sm font-medium hover:bg-black hover:text-white transition inline-block"
>
  Contact Me
</a>


          </div>
        </motion.section>
      </main>

     {/* SERVICES */}
<section
  id="services"
  className="bg-white px-6 py-32 scroll-mt-24"
>
  <div className="max-w-6xl mx-auto">
    <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-black">
      Services
    </h2>

    <p className="mt-4 max-w-xl text-gray-600">
      We help brands and businesses stand out through thoughtful design
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
          Packaging Design
        </h3>
        <p className="mt-3 text-gray-600 text-sm leading-relaxed">
          Strategic and visually appealing packaging that enhances shelf impact, communicates value, and builds brand recall.
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
          Logo Design

        </h3>
        <p className="mt-3 text-gray-600 text-sm leading-relaxed">
          Distinctive, timeless logos designed to represent your brand’s personality and create instant recognition.
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
          Branding
        </h3>
        <p className="mt-3 text-gray-600 text-sm leading-relaxed">
          Complete brand systems crafted to define your voice, visuals, and positioning across every customer touchpoint.
        </p>
      </motion.div>


        {/* Card 4 */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
        viewport={{ once: true }}
        className="w-full h-full text-left border border-gray-200 rounded-2xl p-8 hover:border-black transition group cursor-pointer transition-transform duration-300 hover:-translate-y-1"
      >
        <h3 className="text-xl font-medium text-black">
          Motion Graphics
        </h3>
        <p className="mt-3 text-gray-600 text-sm leading-relaxed">
          Engaging motion visuals that simplify communication, boost attention, and bring your brand stories to life.
        </p>
      </motion.div>

      {/* Card 5 */}
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
          User-centric interfaces and digital product experiences designed for clarity, usability, and conversion.
        </p>
      </motion.div>


      {/* Card 6 */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
        viewport={{ once: true }}
        className="w-full h-full text-left border border-gray-200 rounded-2xl p-8 hover:border-black transition group cursor-pointer transition-transform duration-300 hover:-translate-y-1"
      >
        <h3 className="text-xl font-medium text-black">
          Video Editing
        </h3>
        <p className="mt-3 text-gray-600 text-sm leading-relaxed">
          High-quality edits optimized for storytelling, brand consistency, and performance across platforms.
        </p>
      </motion.div>

      {/* Card 7 */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
        viewport={{ once: true }}
        className="w-full h-full text-left border border-gray-200 rounded-2xl p-8 hover:border-black transition group cursor-pointer transition-transform duration-300 hover:-translate-y-1"
      >
        <h3 className="text-xl font-medium text-black">
          Social Media Design
        </h3>
        <p className="mt-3 text-gray-600 text-sm leading-relaxed">
          Scroll-stopping designs tailored to your audience, platforms, and marketing goals.
        </p>
      </motion.div>

      {/* Card 8 */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
        viewport={{ once: true }}
        className="w-full h-full text-left border border-gray-200 rounded-2xl p-8 hover:border-black transition group cursor-pointer transition-transform duration-300 hover:-translate-y-1"
      >
        <h3 className="text-xl font-medium text-black">
          Print & Digital Design
        </h3>
        <p className="mt-3 text-gray-600 text-sm leading-relaxed">
          Professionally designed assets for both print and digital use, ensuring consistency and visual impact.
        </p>
      </motion.div>

      {/* Card 9 */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
        viewport={{ once: true }}
        className="w-full h-full text-left border border-gray-200 rounded-2xl p-8 hover:border-black transition group cursor-pointer transition-transform duration-300 hover:-translate-y-1"
      >
        <h3 className="text-xl font-medium text-black">
          Website Development
        </h3>
        <p className="mt-3 text-gray-600 text-sm leading-relaxed">
          Clean, responsive websites built for speed, usability, and a professional brand presence. Designed to work smoothly across all devices and grow with your business.
        </p>
      </motion.div>

    </div>
  </div>
</section>

{/* Portfolio WORK */}
<section
  id="work"
  className="bg-white px-6 py-28 scroll-mt-24"
>
  <div className="max-w-6xl mx-auto">

    <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-black">
      Portfolio
    </h2>

    <p className="mt-4 max-w-xl text-gray-600">
      A glimpse of recent branding and design projects.
    </p>

    <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-12">
      {projects.slice(0, 2).map((project) => (
  <a
    key={project.slug}
    href="/work"
    className="group relative cursor-pointer transition-transform duration-300 hover:-translate-y-1"
  >
    <div className="relative w-full aspect-[4/3] rounded-2xl bg-gray-100 overflow-hidden flex items-center justify-center">
      <img
        src={project.thumbnail}
        alt={project.title}
        className="max-w-full max-h-full object-contain"
      />
{/* Hover Overlay */}
<div className="
  absolute inset-0
  flex items-center justify-center
  bg-black/70
  text-white text-sm font-medium
  opacity-0
  group-hover:opacity-100
  transition-opacity duration-300
">
  Case study coming soon
</div>


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


{/* CLIENTS */}
<section className="bg-[#ffffff] px-6 py-32">
  <div className="max-w-6xl mx-auto">

    <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-center bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
      Clients I’ve Worked With
    </h2>

    <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
      
      {/* LOGO CARD */}
      {[  
        "/clients/greengainz.png",
        "/clients/kundal.png",
        "/clients/atlas-mentor.png",
        // "/clients/shantee-homes.png",
        "/clients/patel-classes.png",
        "/clients/supiato.png",
        // "/clients/aga-engineering.png",
        "/clients/kaka.png",
        // "/clients/jay-lifts.png",
        // "/clients/maheshwari.png",
        "/clients/jenny.png",
        "/clients/metalit.png",
      ].map((logo, index) => (
        <div
          key={index}
          className="bg-[#f2f2f2] rounded-xl h-[90px] flex items-center justify-center transition-all duration-300 hover:scale-[1.04]"
        >
          <img
            src={logo}
            alt="Client logo"
            className="max-h-[42px] max-w-[80%] object-contain"
          />
        </div>
      ))}

    </div>
  </div>
</section>





{/* TESTIMONIALS 
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
      
      {/* Testimonial 1 
      
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

      {/* Testimonial 2 
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

        
      

      {/* Testimonial 3 
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
*/}


{/* TRUST / ACHIEVEMENTS */}

<section className="bg-white px-6 py-24">
  <div className="max-w-6xl mx-auto">

    {/* Heading */}
    <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-black text-center">
      Achievements
    </h2>

    {/* Grid */}
    <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 justify-items-center">

      {/* Item 1 */}
      <div className="w-full max-w-xs text-center">
        <p className="text-4xl font-semibold text-black">10+</p>
        <p className="mt-2 text-sm text-gray-600">
          Years of experience
        </p>
      </div>

      {/* Item 2 */}
      <div className="w-full max-w-xs text-center">
        <p className="text-4xl font-semibold text-black">50+</p>
        <p className="mt-2 text-sm text-gray-600">
          Projects completed
        </p>
      </div>

      {/* 👉 Future Item (just uncomment when needed) */}
      
      <div className="w-full max-w-xs text-center">
        <p className="text-4xl font-semibold text-black">20+</p>
        <p className="mt-2 text-sm text-gray-600">
          Brands worked with
        </p>
      </div>
     

    </div>
  </div>
</section>




{/* const [showPopup, setShowPopup] = useState(false); */}
    </>
  );
}
