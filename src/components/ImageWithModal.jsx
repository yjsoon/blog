import { useEffect, useState, useCallback } from "react";

export default function ImageWithModal(props) {
  const [naturalSize, setNaturalSize] = useState({
    w: props.width || 0,
    h: props.height || 0,
  });
  const [viewport, setViewport] = useState({ w: 0, h: 0 });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const update = () =>
      setViewport({ w: window.innerWidth, h: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
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

  const onKeyDown = useCallback(
    e => {
      if (!open) return;
      if (e.key === "Escape") setOpen(false);
    },
    [open]
  );

  useEffect(() => {
    if (!open) return;
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onKeyDown]);

  return (
    <div>
      <figure className={props.className || ""}>
        <button
          type="button"
          className="block w-full cursor-zoom-in border-0 bg-transparent p-0"
          aria-label={`View ${props.alt} at full size`}
          onClick={() => setOpen(true)}
        >
          {props.children}
        </button>
        {props.title && (
          <figcaption className="mt-1 text-center text-sm text-foreground">
            {props.title}
          </figcaption>
        )}
      </figure>

      {open && (
        <div
          className="fixed inset-0 z-[1000]"
          aria-modal="true"
          role="dialog"
          aria-label={props.title || props.alt || "Image preview"}
          onClick={() => setOpen(false)}
        >
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div
              className="flex max-h-[90vh] max-w-[90vw] flex-col items-center rounded-md border border-border bg-background p-4"
              style={computedWidthStyle}
              onClick={e => e.stopPropagation()}
            >
              <div className="flex flex-col items-center">
                <img
                  src={props.fullSrc}
                  alt={props.alt}
                  width={props.width}
                  height={props.height}
                  className="max-h-[calc(90vh-4rem)] max-w-full"
                  onLoad={e => {
                    const img = e.currentTarget;
                    if (img && img.naturalWidth && img.naturalHeight) {
                      setNaturalSize({
                        w: img.naturalWidth,
                        h: img.naturalHeight,
                      });
                    }
                  }}
                />
                <div className="mt-1 text-center text-sm text-foreground">
                  {props.title ? props.title : props.alt}
                </div>
              </div>
              <button
                type="button"
                className="absolute top-3 right-3 inline-flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background text-foreground hover:text-accent focus:outline-hidden"
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
