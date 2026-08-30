import { useEffect, useRef, useState, type ComponentProps } from "react";
import { Maximize, Minimize } from "lucide-react";

type VideoProps = ComponentProps<"video">;

type WatermarkedVideoPlayerProps = {
  className?: string;
  fit?: "contain" | "cover";
  showWatermark?: boolean;
  showFullscreenButton?: boolean;
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

// NOTE ON FULLSCREEN:
// The native media controls' fullscreen button only expands the <video> ELEMENT,
// which would leave the watermark overlay (a sibling in the wrapper) out of the
// fullscreen frame. To keep the watermark visible we deliberately fullscreen the
// WRAPPER container (which holds the <video> and the overlay together) via the
// custom button rendered below, and we hide the native fullscreen button where the
// browser lets us (Chromium/WebKit). Firefox's native button can't be removed, so
// a fullscreenchange handler also retargets any video-only fullscreen up to the
// wrapper. There is no universal way to disable just the native fullscreen control.

function getFullscreenElement(): Element | null {
  return (
    document.fullscreenElement ??
    (document as Document & { webkitFullscreenElement?: Element | null }).webkitFullscreenElement ??
    null
  );
}

function enterFullscreen(el: HTMLElement): void {
  try {
    if (el.requestFullscreen) {
      void el.requestFullscreen().catch(() => {});
    } else if (
      (el as HTMLElement & { webkitRequestFullscreen?: () => void }).webkitRequestFullscreen
    ) {
      (el as HTMLElement & { webkitRequestFullscreen: () => void }).webkitRequestFullscreen();
    }
  } catch {
    /* best-effort only — user always has the custom button */
  }
}

function exitFullscreen(): void {
  try {
    if (getFullscreenElement()) {
      void (document.exitFullscreen?.().catch(() => {}) ?? Promise.resolve());
    } else {
      (document as Document & { webkitExitFullscreen?: () => void }).webkitExitFullscreen?.();
    }
  } catch {
    /* best-effort only */
  }
}

export function WatermarkedVideoPlayer({
  className,
  fit = "contain",
  showWatermark = true,
  showFullscreenButton = true,
  src,
  ...videoProps
}: WatermarkedVideoPlayerProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const onFullscreenChange = () => {
      const wrapper = wrapperRef.current;
      const video = videoRef.current;
      setIsFullscreen(getFullscreenElement() === wrapper);
      // Native controls can still fullscreen just the <video> element (Firefox, or
      // keyboard shortcuts in some browsers), leaving the watermark behind — lift
      // that up to the wrapper so the overlay stays part of the fullscreen frame.
      if (getFullscreenElement() === video && wrapper) {
        enterFullscreen(wrapper);
      }
    };
    document.addEventListener("fullscreenchange", onFullscreenChange);
    document.addEventListener("webkitfullscreenchange", onFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", onFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", onFullscreenChange);
    };
  }, []);

  const toggleFullscreen = () => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    if (getFullscreenElement() === wrapper) {
      exitFullscreen();
    } else {
      enterFullscreen(wrapper);
    }
  };

  return (
    <div
      ref={wrapperRef}
      className={`group watermark-video-wrapper relative overflow-hidden ${className ?? ""}`}
    >
      <video
        ref={videoRef}
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
      {showFullscreenButton && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            toggleFullscreen();
          }}
          aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          className="absolute bottom-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full glass text-foreground ring-1 ring-border opacity-0 transition-opacity duration-200 group-hover:opacity-100 focus-visible:opacity-100 max-sm:opacity-100"
        >
          {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
        </button>
      )}
    </div>
  );
}
