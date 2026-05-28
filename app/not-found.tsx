import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Page not found",
  description: "The page you requested could not be found on the TechAim website.",
  path: "/404",
  noIndex: true,
});

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-brand-bg px-4 pt-20 text-center">
      <div>
        <p className="font-body text-xs uppercase tracking-[0.22em] text-brand-crimson">404</p>
        <h1 className="mt-5 font-heading text-5xl font-bold text-brand-text-primary">Target Not Found</h1>
        <p className="mt-5 max-w-xl">
          The firing point is quiet on this route. Head back to the main range and keep scoring.
        </p>
        <Link href="/" className="mt-8 inline-block bg-brand-crimson px-8 py-3 font-heading text-sm font-semibold text-brand-text-primary">
          Return Home
        </Link>
      </div>
    </main>
  );
}
