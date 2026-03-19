'use client';

import { useState } from 'react';
import Image from 'next/image';
import Modal from '@/components/shared/Modal';
import { cn } from '@/lib/utils/cn';
import type { ProductImage } from '@/lib/types/product';

export interface ProductImagesProps {
  images: ProductImage[];
  productName: string;
}

/** PDP gallery — thumbnail strip + main image + lightbox on click. */
export default function ProductImages({ images, productName }: ProductImagesProps) {
  const [selected, setSelected] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row gap-3 lg:gap-4">
      {/* Thumbnail strip */}
      <div className="flex flex-row md:flex-col gap-2 order-2 md:order-1">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className={cn(
              'relative shrink-0 overflow-hidden rounded-sm transition-all duration-200',
              'w-16 h-20 md:w-14 md:h-[72px]',
              selected === i
                ? 'ring-2 ring-[var(--color-charcoal)] ring-offset-1'
                : 'ring-1 ring-[var(--color-stone)] opacity-70 hover:opacity-100'
            )}
            aria-label={`View image ${i + 1}`}
          >
            <Image src={img.src} alt={img.alt} fill sizes="64px" className="object-cover" />
          </button>
        ))}
      </div>

      {/* Main image */}
      <div
        className="relative flex-1 aspect-[4/5] overflow-hidden rounded-sm bg-[var(--color-cream)] cursor-zoom-in order-1 md:order-2"
        onClick={() => setLightboxOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && setLightboxOpen(true)}
        aria-label="Enlarge image"
      >
        <Image
          src={images[selected]?.src ?? images[0].src}
          alt={images[selected]?.alt ?? images[0].alt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 55vw"
          className="object-cover transition-transform duration-700 ease-out hover:scale-105"
        />
      </div>

      {/* Lightbox */}
      <Modal isOpen={lightboxOpen} onClose={() => setLightboxOpen(false)} label={`${productName} image`} className="w-[90vw] max-w-2xl p-2">
        <div className="relative aspect-[4/5] w-full">
          <Image
            src={images[selected]?.src ?? images[0].src}
            alt={images[selected]?.alt ?? images[0].alt}
            fill
            sizes="90vw"
            className="object-contain rounded-sm"
          />
        </div>
      </Modal>
    </div>
  );
}
