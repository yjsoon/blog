import { useEffect, useState, useCallback } from "react";

export default function ImageWithModal(props) {
  // Handle both string URLs and Astro image objects
  const srcUrl = typeof props.src === 'string' ? props.src : props.src.src || props.src.default;

  const [naturalSize, setNaturalSize] = useState({ w: 0, h: 0 });
  const [viewport, setViewport] = useState({ w: 0, h: 0 });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const update = () => setViewport({ w: window.innerWidth, h: window.innerHeight });
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Let Radix handle scroll locking; prevent auto-focus to avoid scroll jumps

  // Compute desired modal width based on image natural size and viewport
  let computedWidthStyle = undefined;
  if (naturalSize.w > 0 && viewport.w > 0 && viewport.h > 0) {
    const maxW = viewport.w * 0.9;
    const maxHForImage = viewport.h * 0.9 - 64; // ~4rem padding space
    // Scale by height if needed
    let displayW = naturalSize.w;
    let displayH = naturalSize.h;
    if (displayH > maxHForImage && maxHForImage > 0) {
      const scale = maxHForImage / displayH;
      displayW = displayW * scale;
      displayH = maxHForImage;
    }
    // Clamp to 90vw
    displayW = Math.min(displayW, maxW);
    computedWidthStyle = { width: `${Math.max(0, Math.floor(displayW))}px` };
  }

  const onKeyDown = useCallback((e) => {
    if (!open) return;
    if (e.key === 'Escape') setOpen(false);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, onKeyDown]);

  return (
    <div>
      <figure className={props.className || ''}>
        <img
          src={srcUrl}
          alt={props.alt}
          className="max-h-[50vh] cursor-pointer m-auto"
          onClick={() => setOpen(true)}
        />
        {props.title && (
          <figcaption className="text-foreground text-center text-sm">
            {props.title}
          </figcaption>
        )}
      </figure>

      {open && (
        <div
          className="fixed inset-0 z-[1000]"
          aria-modal="true"
          role="dialog"
          aria-label={props.title || props.alt || 'Image preview'}
          onClick={() => setOpen(false)}
        >
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div
              className="max-h-[90vh] max-w-[90vw] bg-background flex flex-col items-center rounded-md border border-border p-4"
              style={computedWidthStyle}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col items-center">
                <img
                  src={srcUrl}
                  alt={props.alt}
                  className="max-h-[calc(90vh-4rem)] max-w-full"
                  onLoad={(e) => {
                    const img = e.currentTarget;
                    if (img && img.naturalWidth && img.naturalHeight) {
                      setNaturalSize({ w: img.naturalWidth, h: img.naturalHeight });
                    }
                  }}
                />
                <div className="text-foreground text-center text-sm mt-2">
                  {props.title ? props.title : props.alt}
                </div>
              </div>
              <button
                type="button"
                className="bg-background text-foreground hover:text-accent absolute top-3 right-3 inline-flex h-8 w-8 items-center justify-center rounded-full border border-border focus:outline-hidden"
                aria-label="Close"
                onClick={() => setOpen(false)}
              >
                {props.closeIcon}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
