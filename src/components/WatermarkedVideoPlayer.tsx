import type { ComponentProps } from "react";

type VideoProps = ComponentProps<"video">;

type WatermarkedVideoPlayerProps = {
  className?: string;
  fit?: "contain" | "cover";
  showWatermark?: boolean;
} & Omit<VideoProps, "className" | "controlsList" | "disablePictureInPicture" | "onContextMenu">;

// NOTE ON PROTECTION LIMITS:
// The protections below (controlsList="nodownload", disablePictureInPicture, and a
// suppressed context menu) deter CASUAL downloading — they hide/replace the native
// controls a typical visitor would use and block the right-click "Save video as...".
// They do NOT make the video technically undownloadable: the file still lives at a
// public URL, so a determined user can retrieve it via browser dev tools
// (Network tab → media response), an <a download>, or a plain screen recording.
// This is an acceptable friction-layer for public showcase videos. TRUE protection
// would require server-side DRM and/or short-lived signed (token-expiring) stream
// URLs generated per request, which is a much larger undertaking — flagging that
// tradeoff here rather than treating this as fully solved.
export function WatermarkedVideoPlayer({
  className,
  fit = "contain",
  showWatermark = true,
  src,
  ...videoProps
}: WatermarkedVideoPlayerProps) {
  return (
    <div className={`relative overflow-hidden ${className ?? ""}`}>
      <video
        src={src}
        {...videoProps}
        controlsList="nodownload noremoteplayback"
        disablePictureInPicture
        onContextMenu={(e) => e.preventDefault()}
        className={`block h-full w-full ${fit === "cover" ? "object-cover" : "object-contain"}`}
      />
      {showWatermark && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden select-none"
        >
          <span className="animate-watermark-drift absolute -translate-x-1/2 -translate-y-1/2 opacity-30">
            <img
              src="/assets/ol.png"
              alt=""
              className="mx-auto h-7 w-7 rounded-full object-cover"
            />
            <span className="mt-0.5 block whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.35em] text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.85)]">
              Oryntal AI Labs
            </span>
          </span>
        </span>
      )}
    </div>
  );
}
