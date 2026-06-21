import Image from "next/image";
import { projects } from "@/data/projects";

export const metadata = {
  title: "Work",
  description:
    "Explore branding, packaging, and digital design projects created for modern businesses.",
};

export default function WorkPage() {
  return (
    <main className="bg-white px-6 py-32 text-black">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          All Projects
        </h1>

        <p className="mt-6 max-w-2xl text-gray-600">
          A complete collection of branding, packaging, and digital design
          projects created for startups and growing businesses.
        </p>

        <div className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.slug}
              data-analytics-view="portfolio_project_view"
              data-analytics-category="portfolio"
              data-analytics-id={project.slug}
              data-analytics-name={project.title}
              data-analytics-label={project.title}
              className="group cursor-pointer transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-2xl bg-gray-100 transition-shadow group-hover:shadow-lg">
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

              <h3 className="mt-5 text-lg font-medium">{project.title}</h3>
              <p className="text-sm text-gray-600">{project.description}</p>
              <p className="mt-2 text-xs text-gray-400">
                Case study coming soon
              </p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
