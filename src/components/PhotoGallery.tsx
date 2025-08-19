import React, { useState } from 'react';
import { ColumnsPhotoAlbum } from 'react-photo-album';
import Lightbox from 'yet-another-react-lightbox';
import 'react-photo-album/columns.css';
import 'yet-another-react-lightbox/styles.css';

interface Photo {
  src: string;
  width: number;
  height: number;
  alt?: string;
}

interface Props {
  photos: Photo[];
  targetRowHeight?: number;
}

export default function PhotoGallery({ photos, targetRowHeight = 180 }: Props) {
  const [index, setIndex] = useState(-1);

  return (
    <div className="my-4">
      <style jsx global>{`
        .react-photo-album--columns {
          gap: 2px !important;
          column-gap: 4px !important;
        }
        .react-photo-album--columns > div {
          gap: 2px !important;
        }
        .react-photo-album--column {
          display: flex !important;
          flex-direction: column !important;
          gap: 2px !important;
        }
        .react-photo-album--photo {
          display: block !important;
          line-height: 0 !important;
          margin: 0 !important;
          padding: 0 !important;
        }
        .react-photo-album--photo img {
          display: block !important;
          margin: 0 !important;
          padding: 0 !important;
        }
        .react-photo-album--track {
          gap: 2px !important;
        }
      `}</style>
      <ColumnsPhotoAlbum
        photos={photos}
        columns={(containerWidth) => {
          if (containerWidth < 400) return 2;
          if (containerWidth < 600) return 3;
          if (containerWidth < 900) return 4;
          return 5;
        }}
        spacing={2}
        onClick={({ index }) => setIndex(index)}
      />
      
      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={photos}
      />
    </div>
  );
}