
export const metadata = {
  title: "About — YourBrand | Branding & Packaging Designer",
  description:
    "Learn more about YourBrand, a graphic designer specializing in branding, premium packaging, and digital design for startups and growing businesses.",
};


export default function AboutPage() {
  return (
    <main className="bg-white text-black">

  {/* SECTION 1 — TEXT LEFT / IMAGE RIGHT */}
  <section className="px-6 py-32">
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

      {/* TEXT */}
      <div className="flex flex-col gap-6">

  {/* Name + Role + Social */}
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

    {/* Name + Role */}
    <div>
      <h1 className="text-4xl sm:text-3xl font-semibold tracking-tight text-black">
        Fardin Pathan
      </h1>

      <p className="mt-1 text-sm text-gray-500">
        Creative Designer | Motion Designer   
      </p>
    </div>

  {/* Social Icons */}
<div className="flex items-center gap-4">

  {/* Instagram */}
  <a
    href="https://www.instagram.com/dziner_ai/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Instagram"
    className="transition hover:opacity-80"
  >
    <img
      src="/icons/instagram.png"
      alt="Instagram"
      className="w-8 h-8"
    />
  </a>

  {/* LinkedIn */}
  <a
    href="https://www.linkedin.com/in/pathanfardin/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="LinkedIn"
    className="transition hover:opacity-80"
  >
    <img
      src="/icons/linkedin.png"
      alt="LinkedIn"
      className="w-8 h-8"
    />
  </a>

  {/* YouTube */}
  <a
    href="https://www.youtube.com/@FARDINSAMPATHAN"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="YouTube"
    className="transition hover:opacity-80"
  >
    <img
      src="/icons/youtube.png"
      alt="YouTube"
      className="w-8 h-8"
    />
  </a>

  {/* Behance */}
  <a
    href="https://www.behance.net/fardinpathan7"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Behance"
    className="transition hover:opacity-80"
  >
    <img
      src="/icons/behance.png"
      alt="Behance"
      className="w-8 h-8"
    />
  </a>

</div>


    
  </div>

  {/* Description */}
  <p className="text-lg text-gray-600 leading-relaxed">
    Hi, I’m Fardin Pathan, a graphic designer with 4+ years of experience in branding, social media design, motion graphics, and creative projects. I specialize in crafting impactful visuals that blend innovation, aesthetics, and strategic thinking to help businesses stand out. From brand identities and motion-led visuals to marketing materials, I deliver designs that are purpose-driven, engaging, and built to create real brand value
  </p>

  <p className="text-lg text-gray-600 leading-relaxed">
    My approach is simple- understand the business, design with clarity,
    and deliver work that looks good and performs well.
  </p>

</div>


      {/* IMAGE */}
      <div className="rounded-2xl overflow-hidden bg-gray-100">
        <img
          src="/about/profile.jpg"
          alt="About me"
          className="w-full h-full object-cover"
        />
      </div>

    </div>
  </section>


      {/* MOBILE SEPARATOR */}
<div className="block md:hidden my-16">
  <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
</div>



  {/* SECTION 2 — IMAGE LEFT / TEXT RIGHT */}
  <section className="px-6 py-32">
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
{/* IMAGE */}
      <div className="rounded-2xl overflow-hidden bg-gray-100">
        <img
          src="/about/profile2.jpg"
          alt="About me"
          className="w-full h-full object-cover"
        />
      </div>
      {/* TEXT */}
      <div className="flex flex-col gap-6">

  {/* Name + Role + Social */}
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

    {/* Name + Role */}
    <div>
      <h1 className="text-4xl sm:text-3xl font-semibold tracking-tight text-black">
        Junaid Sayyed
      </h1>

      <p className="mt-1 text-sm text-gray-500">
        Graphic Designer & Branding Expert
      </p>
    </div>

    {/* Social Icons */}
      {/* Social Icons */}
<div className="flex items-center gap-4">

  {/* Instagram */}
  <a
    href="https://www.instagram.com/waajibul_cuddle/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Instagram"
    className="transition hover:opacity-80"
  >
    <img
      src="/icons/instagram.png"
      alt="Instagram"
      className="w-8 h-8"
    />
  </a>

  {/* LinkedIn */}
  <a
    href="https://www.linkedin.com/in/junaid-sayyed-1a483989/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="LinkedIn"
    className="transition hover:opacity-80"
  >
    <img
      src="/icons/linkedin.png"
      alt="LinkedIn"
      className="w-8 h-8"
    />
  </a>

  {/* YouTube */}
  {/* <a
    href="https://www.youtube.com/@FARDINSAMPATHAN"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="YouTube"
    className="transition hover:opacity-80"
  >
    <img
      src="/icons/youtube.png"
      alt="YouTube"
      className="w-8 h-8"
    />
  </a> */}

  {/* Behance */}
  <a
    href="https://www.behance.net/JunaidSayyed03"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Behance"
    className="transition hover:opacity-80"
  >
    <img
      src="/icons/behance.png"
      alt="Behance"
      className="w-8 h-8"
    />
  </a>

</div>


  </div>

  {/* Description */}
  <p className="text-lg text-gray-600 leading-relaxed">
    Hi I'm Junaid Sayyed, a graphic designer with 10+ years of experience in print and digital design across multiple industries.

My work includes branding, marketing creatives, catalogues, packaging, brochures, social media content, presentations, and promotional materials. I’ve collaborated on projects for well-known brands such as EPC Mahindra, GreatWhite Electricals, and the Ashoka Group of Schools, delivering visuals that align with brand identity and business goals.
  </p>

  <p className="text-lg text-gray-600 leading-relaxed">
    Having worked with clients from diverse sectors, I focus on creating designs that are clear, consistent, and visually impactful. I believe good design is not just about aesthetics, but about communication that adds real value.
  </p>

</div>


      

    </div>
  </section>

  {/* SECTION 3 — CTA */}
  <section className="px-6 py-32">
    <div className="max-w-4xl mx-auto text-center">

      <h2 className="text-3xl font-semibold">
        Let’s work together
      </h2>

      <p className="mt-6 text-gray-600 text-lg">
        If you’re looking for a designer who understands business and design,
        let’s talk.
      </p>

      <div className="mt-10">
        <a
          href="mailto:fardesiggns@gmail.com"
          className="inline-block px-12 py-4 rounded-full bg-black text-white
                     text-sm font-medium hover:bg-gray-800 transition"
        >
          Start a project
        </a>
      </div>

    </div>
  </section>

</main>

  );
}
