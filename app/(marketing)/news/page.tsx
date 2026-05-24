import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "News & ISSF",
  description: "ISSF updates and TechAim electronic scoring resources.",
};

const posts = [
  {
    title: "Why ISSF electronic scoring matters for modern ranges",
    date: "2026-05-20",
    body: "Electronic scoring improves scoring consistency, match flow, and confidence for athletes and officials.",
  },
  {
    title: "Range modernization checklist for clubs",
    date: "2026-05-20",
    body: "Evaluate lane count, networking, displays, training requirements, and upgrade paths before procurement.",
  },
];

export default function NewsPage() {
  return (
    <main className="bg-brand-bg pt-20">
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <p className="font-body text-xs uppercase tracking-[0.22em] text-brand-crimson">Resources</p>
        <h1 className="mt-5 font-heading text-5xl font-bold text-brand-text-primary md:text-7xl">News & ISSF</h1>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <article key={post.title} className="border border-brand-border bg-brand-panel p-6">
              <p className="text-sm text-brand-crimson">{post.date}</p>
              <h2 className="mt-4 font-heading text-2xl font-bold text-brand-text-primary">{post.title}</h2>
              <p className="mt-4 leading-7">{post.body}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
