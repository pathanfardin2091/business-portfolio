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
      <div>
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">
          Who am I?
        </h1>

        <p className="mt-8 text-lg text-gray-600 leading-relaxed">
          I’m a graphic designer with over 4+ years of experience helping
          startups and growing businesses build strong brand identities,
          premium packaging, and clean digital experiences.
        </p>

        <p className="mt-4 text-lg text-gray-600 leading-relaxed">
          My approach is simple — understand the business, design with clarity,
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
      <div>
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">
          Who am I?
        </h1>

        <p className="mt-8 text-lg text-gray-600 leading-relaxed">
          I’m a graphic designer with over 4+ years of experience helping
          startups and growing businesses build strong brand identities,
          premium packaging, and clean digital experiences.
        </p>

        <p className="mt-4 text-lg text-gray-600 leading-relaxed">
          My approach is simple — understand the business, design with clarity,
          and deliver work that looks good and performs well.
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
