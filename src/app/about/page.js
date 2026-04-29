import Image from "next/image";

export const metadata = {
  title: "About | FarDesign",
  description:
    "Learn more about FarDesign, a creative design portfolio specializing in branding, packaging, motion graphics, and digital design.",
};

const fardinLinks = [
  {
    href: "https://www.instagram.com/dziner_ai/",
    label: "Instagram",
    icon: "/icons/instagram.png",
  },
  {
    href: "https://www.linkedin.com/in/pathanfardin/",
    label: "LinkedIn",
    icon: "/icons/linkedin.png",
  },
  {
    href: "https://www.youtube.com/@FARDINSAMPATHAN",
    label: "YouTube",
    icon: "/icons/youtube.png",
  },
  {
    href: "https://www.behance.net/fardinpathan7",
    label: "Behance",
    icon: "/icons/behance.png",
  },
];

const junaidLinks = [
  {
    href: "https://www.instagram.com/waajibul_cuddle/",
    label: "Instagram",
    icon: "/icons/instagram.png",
  },
  {
    href: "https://www.linkedin.com/in/junaid-sayyed-1a483989/",
    label: "LinkedIn",
    icon: "/icons/linkedin.png",
  },
  {
    href: "https://www.behance.net/JunaidSayyed03",
    label: "Behance",
    icon: "/icons/behance.png",
  },
];

export default function AboutPage() {
  return (
    <main className="bg-white text-black">
      <ProfileSection
        name="Fardin Pathan"
        role="Creative Designer | Motion Designer"
        image="/about/profile.jpg"
        imageAlt="Fardin Pathan"
        socialLinks={fardinLinks}
        paragraphs={[
          "Hi, I'm Fardin Pathan, a graphic designer with 4+ years of experience in branding, social media design, motion graphics, and creative projects. I specialize in crafting impactful visuals that blend innovation, aesthetics, and strategic thinking to help businesses stand out.",
          "My approach is simple: understand the business, design with clarity, and deliver work that looks good and performs well.",
        ]}
      />

      <div className="my-16 block md:hidden">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
      </div>

      <ProfileSection
        reverse
        name="Junaid Sayyed"
        role="Graphic Designer & Branding Expert"
        image="/about/profile2.jpg"
        imageAlt="Junaid Sayyed"
        socialLinks={junaidLinks}
        paragraphs={[
          "Hi, I'm Junaid Sayyed, a graphic designer with 10+ years of experience in print and digital design across multiple industries.",
          "My work includes branding, marketing creatives, catalogues, packaging, brochures, social media content, presentations, and promotional materials. I've collaborated on projects for brands such as EPC Mahindra, GreatWhite Electricals, and the Ashoka Group of Schools.",
          "Having worked with clients from diverse sectors, I focus on creating designs that are clear, consistent, and visually impactful.",
        ]}
      />

      <section className="px-6 py-32">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-semibold">Let&apos;s work together</h2>

          <p className="mt-6 text-lg text-gray-600">
            If you&apos;re looking for designers who understand business and
            design, let&apos;s talk.
          </p>

          <div className="mt-10">
            <a
              href="mailto:fardesiggns@gmail.com"
              className="inline-block rounded-full bg-black px-12 py-4 text-sm font-medium text-white transition hover:bg-gray-800"
            >
              Start a project
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

function ProfileSection({
  reverse = false,
  name,
  role,
  image,
  imageAlt,
  socialLinks,
  paragraphs,
}) {
  return (
    <section className="px-6 py-32">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 md:grid-cols-2">
        <div
          className={`relative aspect-[4/5] overflow-hidden rounded-2xl bg-gray-100 ${
            reverse ? "md:order-1" : "md:order-2"
          }`}
        >
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        <div
          className={`flex flex-col gap-6 ${
            reverse ? "md:order-2" : "md:order-1"
          }`}
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-4xl font-semibold tracking-tight text-black sm:text-3xl">
                {name}
              </h1>
              <p className="mt-1 text-sm text-gray-500">{role}</p>
            </div>

            <div className="flex items-center gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="transition hover:opacity-80"
                >
                  <Image
                    src={link.icon}
                    alt=""
                    width={32}
                    height={32}
                    className="h-8 w-8"
                  />
                </a>
              ))}
            </div>
          </div>

          {paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-lg leading-relaxed text-gray-600">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
