export const metadata = {
  title: "About — YourBrand | Branding & Packaging Designer",
  description:
    "Learn more about YourBrand, a graphic designer specializing in branding, premium packaging, and digital design for startups and growing businesses.",
};


export default function AboutPage() {
  return (
    <main className="px-6 py-32 bg-white text-black">
      <div className="max-w-4xl mx-auto">

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">
          About Me
        </h1>

        {/* Intro */}
        <p className="mt-8 text-lg text-gray-600 leading-relaxed">
  I’m a graphic designer with over 4 years of experience helping startups
  and growing businesses build strong brand identities, premium packaging,
  and clean digital experiences.
</p>

<p className="mt-4 text-lg text-gray-600 leading-relaxed">
  My approach is simple — understand the business, design with clarity,
  and deliver work that looks good and performs well.
</p>


        {/* What I Do */}
        <div className="mt-16 space-y-4">
          <h2 className="text-2xl font-semibold">
            What I do
          </h2>

          <ul className="mt-6 space-y-3 text-gray-700 list-disc list-inside">
            <li>Brand identity & logo design</li>
            <li>Packaging design (consumer & retail)</li>
            <li>Website & UI design</li>
            <li>Design systems & visual consistency</li>
          </ul>
        </div>

        {/* Experience */}
        <p className="mt-6 text-gray-700 leading-relaxed">
  Over the years, I’ve collaborated with founders, marketers, and product
  teams to create design systems that are practical, scalable, and visually
  consistent.
</p>

<p className="mt-4 text-gray-700">
  Tools I regularly work with include Adobe Illustrator, Photoshop, Figma,
  Pacdora, and modern web tools.
</p>


        {/* CTA */}
        <div className="mt-20">
          <a
            href="mailto:fardesiggns@gmail.com"
            className="inline-block px-10 py-4 rounded-full bg-black text-white
                       text-sm font-medium hover:bg-gray-800 transition"
          >
            Let’s work together
          </a>
        </div>

      </div>
    </main>
  );
}
