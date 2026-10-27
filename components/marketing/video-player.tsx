import { cx } from "@/components/ui";

/** Turns a YouTube, Vimeo or Google Drive share link into an embeddable URL. Returns null for a plain file. */
function toEmbed(src: string): string | null {
  try {
    const u = new URL(src, "https://x.invalid");
    const host = u.hostname.replace(/^www\./, "");
    if (host === "youtu.be") return `https://www.youtube-nocookie.com/embed/${u.pathname.slice(1)}?rel=0`;
    if (host.endsWith("youtube.com")) {
      const id = u.searchParams.get("v") ?? u.pathname.split("/").filter(Boolean).pop();
      return `https://www.youtube-nocookie.com/embed/${id}?rel=0`;
    }
    if (host === "vimeo.com") return `https://player.vimeo.com/video/${u.pathname.split("/").filter(Boolean)[0]}`;
    if (host === "player.vimeo.com") return src;
    if (host === "drive.google.com") {
      const id = u.pathname.match(/\/d\/([^/]+)/)?.[1] ?? u.searchParams.get("id");
      return id ? `https://drive.google.com/file/d/${id}/preview` : null;
    }
  } catch {
    // fall through to a plain file
  }
  return null;
}

/** A 16:9 video: an embedded player for YouTube, Vimeo or Drive links, or a native player for a file. */
export function VideoPlayer({
  src,
  poster,
  title,
  className,
}: {
  src: string;
  poster?: string;
  title: string;
  className?: string;
}) {
  const embed = toEmbed(src);
  return (
    <div className={cx("aspect-video w-full overflow-hidden rounded-[20px] bg-night shadow-[0_30px_70px_rgb(10_22_51/0.25)] lg:rounded-[28px]", className)}>
      {embed ? (
        <iframe
          src={embed}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          className="size-full"
        />
      ) : (
        <video src={src} poster={poster} controls playsInline preload="metadata" className="size-full bg-night object-contain">
          <track kind="captions" />
        </video>
      )}
    </div>
  );
}
