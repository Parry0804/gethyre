"use client";

import { useRef, useState } from "react";
import { PlayIcon } from "@/components/icons";
import { track } from "@/lib/track";

/** A self-hosted video that shows its poster and a large play button until it's started. */
export function PosterVideo({ src, poster, title, label }: { src: string; poster?: string; title: string; label?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  const play = () => {
    setStarted(true);
    track("video_play", { video: title });
    void ref.current?.play();
  };

  return (
    <div className="relative size-full">
      <video
        ref={ref}
        src={src}
        poster={poster}
        controls={started}
        playsInline
        preload="metadata"
        aria-label={title}
        className="size-full bg-night object-contain"
        onPlay={() => setStarted(true)}
      />
      {!started ? (
        <button
          type="button"
          onClick={play}
          aria-label={`Play: ${title}`}
          className="group absolute inset-0 flex flex-col items-center justify-center gap-4 bg-night/25 transition-colors hover:bg-night/10"
        >
          <span className="relative flex size-20 items-center justify-center rounded-full bg-white text-primary shadow-[0_18px_40px_rgb(10_22_51/0.35)] transition-transform group-hover:scale-105 lg:size-24">
            <span className="animate-ping-soft absolute inset-0 rounded-full bg-white/60" aria-hidden />
            <PlayIcon size={32} className="relative translate-x-0.5" />
          </span>
          {label ? (
            <span className="rounded-md bg-night/80 px-4 py-2 text-sm font-semibold text-white backdrop-blur">{label}</span>
          ) : null}
        </button>
      ) : null}
    </div>
  );
}
