"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Volume2, VolumeX } from "lucide-react";
import { useLocale } from "@/components/providers/locale-provider";
import { Button } from "@/components/ui/button";
import {
  videoTestimonialAssets,
  type VideoTestimonialAsset,
} from "@/lib/marketing/video-testimonials";
import { cn } from "@/lib/utils";

function VideoCard({
  asset,
  nicheLabel,
  businessLabel,
  isMuted,
  onToggleMute,
}: {
  asset: VideoTestimonialAsset;
  nicheLabel: string;
  businessLabel: string;
  isMuted: boolean;
  onToggleMute: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const card = cardRef.current;
    if (!video || !card) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
          setIsPlaying(true);
        } else {
          video.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.6 },
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  return (
    <div
      ref={cardRef}
      className="group relative w-[220px] shrink-0 snap-center sm:w-[240px] lg:w-[260px]"
    >
      <div className="relative aspect-[9/16] overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 shadow-2xl shadow-black/40">
        <div
          className="absolute inset-0"
          style={{ background: asset.posterGradient }}
          aria-hidden
        />
        <video
          ref={videoRef}
          src={asset.src}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-500",
            isPlaying ? "opacity-100" : "opacity-0",
          )}
          muted={isMuted}
          playsInline
          loop
          preload="metadata"
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/30" />

        <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full border border-white/15 bg-black/50 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-md">
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: asset.dotColor }}
          />
          {nicheLabel}
        </span>

        <p className="absolute bottom-3 left-3 right-12 text-sm font-medium leading-snug text-white">
          {businessLabel}
        </p>

        <button
          type="button"
          onClick={onToggleMute}
          className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md transition-colors hover:bg-black/60"
          aria-label={isMuted ? "Unmute video" : "Mute video"}
        >
          {isMuted ? (
            <VolumeX className="h-3.5 w-3.5" />
          ) : (
            <Volume2 className="h-3.5 w-3.5" />
          )}
        </button>
      </div>
    </div>
  );
}

export function VideoTestimonials() {
  const { t } = useLocale();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [mutedMap, setMutedMap] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(videoTestimonialAssets.map((a) => [a.id, true])),
  );

  const toggleMute = useCallback((id: string) => {
    setMutedMap((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const items = t.videoTestimonials.items;

  return (
    <section className="relative overflow-hidden bg-neutral-950 py-20 text-white lg:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,80,255,0.15),transparent)]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
            {t.videoTestimonials.title}
          </h2>
          <p className="mt-4 text-base text-neutral-400 sm:text-lg">
            {t.videoTestimonials.subtitle}
          </p>
        </motion.div>

        <div className="relative mt-14">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-neutral-950 to-transparent sm:w-20" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-neutral-950 to-transparent sm:w-20" />

          <div
            ref={scrollRef}
            className="scrollbar-hide flex gap-4 overflow-x-auto px-2 pb-2 snap-x snap-mandatory sm:gap-5 sm:px-4"
          >
            {videoTestimonialAssets.map((asset, i) => {
              const item = items.find((entry) => entry.id === asset.id) ?? items[i];
              if (!item) return null;

              return (
                <VideoCard
                  key={asset.id}
                  asset={asset}
                  nicheLabel={item.niche}
                  businessLabel={item.business}
                  isMuted={mutedMap[asset.id] ?? true}
                  onToggleMute={() => toggleMute(asset.id)}
                />
              );
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-5 backdrop-blur-sm sm:flex-row"
        >
          <p className="text-center text-sm text-neutral-300 sm:text-left sm:text-base">
            {t.videoTestimonials.ctaText}
          </p>
          <Button
            size="lg"
            className="h-11 shrink-0 bg-lime-400 px-6 text-base font-semibold text-neutral-950 hover:bg-lime-300"
            asChild
          >
            <Link href="/sign-up">
              {t.videoTestimonials.ctaButton}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
