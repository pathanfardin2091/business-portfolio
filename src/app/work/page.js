import { projects } from "@/data/projects";
export const metadata = {
  title: "Work",
  description:
    "Explore branding, packaging, and digital design projects created for modern businesses.",
};

export default function WorkPage() {
  return (
    <main className="px-6 py-32 bg-white text-black">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">
  All Projects
</h1>

       <p className="mt-6 max-w-2xl text-gray-600">
  A complete collection of branding, packaging, and digital design
  projects created for startups and growing businesses.
</p>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-12 ">
          {projects.map((project) => (
            <div
              key={project.slug}
              className="group cursor-pointer group cursor-pointer transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-full aspect-[4/3] rounded-2xl bg-gray-100 overflow-hidden flex items-center justify-center transition-shadow group-hover:shadow-lg ">
                <img
                src={project.thumbnail}
                alt={project.title}
                loading="lazy"
                decoding="async"
                className="max-w-full max-h-full object-contain"
              />

              </div>

              <h3 className="mt-5 text-lg font-medium">
                {project.title}
              </h3>

              <p className="text-sm text-gray-600">
                {project.description}
              </p>
              <p className="mt-2 text-xs text-gray-400">
  Case study coming soon
</p>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}
