"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { videos } from "@/lib/assets";
import { images } from "@/lib/imageRegistry";
import { fadeUp } from "@/lib/motion";
import { cn } from "@/lib/utils";

const posterSrc = images.products.ta50.front.webp;
const youtubeId = process.env.NEXT_PUBLIC_MATCH50_YOUTUBE_ID?.trim();

export default function FeaturedMatch50Video() {
  return (
    <section className="border-t border-brand-border bg-brand-bg py-24 lg:py-32" aria-labelledby="featured-match-50-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={fadeUp}
          className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-center"
        >
          <div>
            <p className="font-body text-xs uppercase tracking-[0.2em] text-brand-crimson">Featured system</p>
            <h2
              id="featured-match-50-heading"
              className="mt-4 font-heading text-[clamp(2rem,4vw,3rem)] font-bold text-brand-text-primary"
            >
              Match 50 in the field
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-8 text-brand-text-body">
              See TechAim Match 50 range setups, target lines, and scoring infrastructure as deployed for 50m
              small-bore competition.
            </p>
            <Button asChild variant="cta" className="mt-8">
              <Link href="/products/match-50">View Match 50 specs</Link>
            </Button>
          </div>

          <div className="overflow-hidden border border-brand-border bg-brand-panel shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
            {youtubeId ? (
              <div className={cn("relative aspect-video w-full bg-brand-elevated")}>
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src={`https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0`}
                  title="TechAim Match 50 promotional video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <video
                className="aspect-video w-full bg-brand-elevated object-cover"
                controls
                playsInline
                preload="metadata"
                poster={posterSrc}
                aria-label="TechAim Match 50 promotional video showing range setup"
              >
                <source src={videos.match50Promo} type="video/mp4" />
              </video>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
