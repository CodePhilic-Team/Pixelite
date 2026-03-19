'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils/cn';
import type { ProductVariant } from '@/lib/types/product';

export interface ProductOptionsProps {
  variants: ProductVariant[];
  onSelect: (variant: ProductVariant) => void;
}

/** Size/color/material variant selector for the PDP. */
export default function ProductOptions({ variants, onSelect }: ProductOptionsProps) {
  const [selected, setSelected] = useState<string | null>(
    variants.find((v) => v.inStock)?.id ?? null
  );

  const handleSelect = (v: ProductVariant) => {
    if (!v.inStock) return;
    setSelected(v.id);
    onSelect(v);
  };

  // Group by type
  const types = [...new Set(variants.map((v) => v.type))];

  return (
    <div className="flex flex-col gap-4">
      {types.map((type) => {
        const typeVariants = variants.filter((v) => v.type === type);
        return (
          <div key={type}>
            <p className="font-body text-xs tracking-widest uppercase text-[var(--color-warm-gray)] mb-2.5">
              {type === 'size' ? 'Size' : type === 'color' ? 'Color' : 'Material'}
            </p>
            <div className="flex flex-wrap gap-2">
              {typeVariants.map((v) => (
                <button
                  key={v.id}
                  onClick={() => handleSelect(v)}
                  disabled={!v.inStock}
                  aria-pressed={selected === v.id}
                  aria-label={`${v.label}${!v.inStock ? ' — out of stock' : ''}`}
                  className={cn(
                    'h-10 px-4 font-body text-sm rounded-sm border transition-all duration-200',
                    selected === v.id
                      ? 'bg-[var(--color-charcoal)] text-[var(--color-ivory)] border-[var(--color-charcoal)]'
                      : v.inStock
                      ? 'bg-transparent text-[var(--color-charcoal)] border-[var(--color-stone)] hover:border-[var(--color-charcoal)]'
                      : 'opacity-40 cursor-not-allowed line-through text-[var(--color-warm-gray)] border-[var(--color-stone)]'
                  )}
                >
                  {v.label}
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
