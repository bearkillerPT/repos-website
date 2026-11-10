import { Play } from "lucide-react";
import { useState } from "react";

import type { Media } from "@/data/projects";
import { cn } from "cn";

interface ProjectMediaProps {
  media: Media;
  className?: string;
}

/** Fixed 16:10 frame, so cards line up and nothing shifts while images load */
export function ProjectMedia({ media, className }: ProjectMediaProps) {
  const frame = cn("relative aspect-16/10 w-full overflow-hidden bg-muted", className);

  if (media.type === "image") {
    const contain = media.fit === "contain";
    return (
      <div className={frame}>
        <img
          src={media.src}
          alt={media.alt}
          loading="lazy"
          decoding="async"
          className={cn("size-full", contain ? "object-contain p-4 md:p-6" : "object-cover object-top")}
        />
      </div>
    );
  }

  return <VideoPlayer media={media} className={frame} />;
}

/**
 * Nothing plays, or even downloads, until the visitor asks: some of these demos are tens of
 * megabytes, and moving images on their own are hard to follow. Then it's the browser's own
 * player, with its keyboard and screen reader support.
 */
function VideoPlayer({
  media,
  className,
}: {
  media: Extract<Media, { type: "video" }>;
  className: string;
}) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <div className={cn(className, "bg-black")}>
        <video
          // The play button is gone, so keyboard focus moves to the player that replaced it
          ref={(node) => node?.focus()}
          src={media.src}
          poster={media.poster}
          aria-label={media.label}
          controls
          autoPlay
          playsInline
          className="size-full object-contain"
        />
      </div>
    );
  }

  return (
    <div className={className}>
      <img
        src={media.poster}
        alt=""
        loading="lazy"
        decoding="async"
        className="size-full object-cover object-top"
      />
      <button
        type="button"
        onClick={() => setPlaying(true)}
        aria-label={`Play video: ${media.label}`}
        className="group/play absolute inset-0 flex items-center justify-center bg-black/25 transition-colors hover:bg-black/10 focus-visible:outline-offset-[-6px]"
      >
        <span className="flex items-center gap-3 rounded-full bg-highlight py-3 pr-6 pl-4 text-lg font-bold text-highlight-foreground shadow-lg transition-transform group-hover/play:scale-105">
          <Play className="size-6 fill-current" aria-hidden="true" />
          Play video
        </span>
      </button>
    </div>
  );
}
