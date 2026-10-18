import { CTABanner } from "@/components/site/CTABanner";
import { SectionHeading } from "@/components/site/SectionHeading";

const techs = [
  { cat: "Frontend", items: ["React", "Next.js", "Vue.js", "Angular", "TypeScript", "Tailwind CSS"] },
  { cat: "Backend", items: ["Node.js", "Python", "Django", "FastAPI", "Laravel", "Go"] },
  { cat: "Mobile", items: ["React Native", "Flutter", "Swift", "Kotlin", "Expo"] },
  { cat: "Database", items: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "Firebase", "Supabase"] },
  { cat: "Cloud", items: ["AWS", "Google Cloud", "Azure", "Docker", "Kubernetes", "Terraform"] },
  { cat: "AI/ML", items: ["TensorFlow", "PyTorch", "OpenAI", "LangChain", "Hugging Face"] },
];

export default function TechnologiesPage() {
  return (
    <div>
      <section className="bg-gradient-to-br from-gray-50 to-white py-16 text-center">
        <div className="mx-auto max-w-3xl px-4">
          <span className="inline-block rounded-full border border-red-200 bg-red-50 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-red-700 mb-4">
            Technologies
          </span>
          <h1 className="text-4xl font-extrabold sm:text-5xl">
            Our <span className="text-red-700">Tech Stack</span>
          </h1>
          <p className="mt-4 text-lg text-gray-500">
            We work with the latest and most powerful technologies to build future-ready solutions.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {techs.map((t) => (
            <div key={t.cat} className="rounded-2xl border border-border bg-white p-6 shadow-sm">
              <h3 className="font-bold text-lg text-red-700 mb-4">{t.cat}</h3>
              <div className="flex flex-wrap gap-2">
                {t.items.map((item) => (
                  <span
                    key={item}
                    className="inline-block rounded-lg bg-gray-50 border border-border px-3 py-1.5 text-sm font-medium"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <CTABanner />
    </div>
  );
}
