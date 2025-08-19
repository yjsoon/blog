import * as Dialog from "@radix-ui/react-dialog";
import { Children, useState } from "react";

export default function ImageWithModal(props) {
  // Handle both string URLs and Astro image objects
  const srcUrl = typeof props.src === 'string' ? props.src : props.src.src || props.src.default;

  return (
    <div>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <div>
            <figure>
              <img
                src={srcUrl}
                alt={props.alt}
                className="max-h-[50vh] m-auto cursor-pointer"
              />
              {props.title && (
                <figcaption className="text-foreground text-center text-sm">
                  {props.title}
                </figcaption>
              )}
            </figure>
          </div>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="bg-background/90 fixed inset-0" />
          <Dialog.Content className="max-h-[90vh] w-[90vw] max-w-[800px] bg-background fixed top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center rounded-md border border-border p-4">
            <div className="flex flex-col items-center">
              <img
                src={srcUrl}
                alt={props.alt}
                className="max-h-[calc(90vh-4rem)] max-w-full"
              />
              <div className="text-foreground text-center text-sm mt-2">
                {props.title ? props.title : props.alt}
              </div>
            </div>
            <Dialog.Close asChild>
              <button
                type="button"
                className="bg-background text-foreground hover:text-accent absolute top-3 right-3 inline-flex h-8 w-8 items-center justify-center rounded-full border border-border focus:outline-hidden"
                aria-label="Close"
              >
                {props.closeIcon}
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
