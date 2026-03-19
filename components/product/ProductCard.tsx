'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { formatPrice } from '@/lib/utils/formatPrice';
import type { Product } from '@/lib/types/product';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { useCart } from '@/lib/hooks/useCart';
import { useWishlistStore } from '@/lib/store/wishlist.store';

export interface ProductCardProps {
  product: Product;
  className?: string;
}

/**
 * Grid view card for a single product.
 * Shows primary image, name, and price.
 * On hover (desktop): reveals Quick Add, scales image.
 * Wishlist toggle always visible.
 */
export default function ProductCard({ product, className }: ProductCardProps) {
  const { slug, name, priceInCents, compareAtPriceInCents, images, isNew, isBestseller } = product;
  const { addItem } = useCart();
  const toggleWishlist = useWishlistStore((s) => s.toggleItem);
  const isWishlisted = useWishlistStore((s) => s.isWishlisted(product.id));

  const handleQuickAdd = () => {
    const defaultVariant = product.variants.find((v) => v.inStock) ?? product.variants[0];
    addItem({
      productId: product.id,
      variantId: defaultVariant?.id ?? 'default',
      name: product.name,
      imageSrc: images[0].src,
      priceInCents: product.priceInCents,
      variant: defaultVariant?.label,
    });
  };

  return (
    <article className={cn('group relative flex flex-col', className)}>
      {/* Image container */}
      <Link
        href={`/product/${slug}`}
        className="relative overflow-hidden aspect-[4/5] bg-[var(--color-cream)] rounded-sm block"
      >
        {images[0] && (
          <Image
            src={images[0].src}
            alt={images[0].alt}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {isNew && <Badge variant="new">New</Badge>}
          {isBestseller && <Badge variant="bestseller">Bestseller</Badge>}
          {product.compareAtPriceInCents && <Badge variant="sale">Sale</Badge>}
        </div>

        {/* Quick Add — slides up on hover, desktop only */}
        <div
          className="absolute bottom-0 inset-x-0 p-3 translate-y-full group-hover:translate-y-0
                     transition-transform duration-300 ease-out hidden md:block"
        >
          <button
            onClick={(e) => { e.preventDefault(); handleQuickAdd(); }}
            className="w-full h-10 bg-[var(--color-charcoal)] text-[var(--color-ivory)]
                       font-body text-xs tracking-wide hover:bg-[var(--color-ink)]
                       transition-colors duration-200 rounded-sm"
          >
            Quick Add
          </button>
        </div>
      </Link>

      {/* Card body */}
      <div className="mt-3 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <Link href={`/product/${slug}`}>
            <h3
              className="font-body text-sm text-[var(--color-charcoal)] truncate
                         hover:text-[var(--color-ink)] transition-colors duration-200"
            >
              {name}
            </h3>
          </Link>
          <p className="mt-0.5 font-mono text-sm text-[var(--color-charcoal)]">
            {formatPrice(priceInCents)}
            {compareAtPriceInCents && (
              <span className="ml-2 line-through text-[var(--color-warm-gray)] text-xs">
                {formatPrice(compareAtPriceInCents)}
              </span>
            )}
          </p>
        </div>

        {/* Wishlist toggle */}
        <Button
          variant="icon"
          aria-label={`${isWishlisted ? 'Remove' : 'Save'} ${name} to wishlist`}
          className="shrink-0"
          onClick={() => toggleWishlist(product.id)}
        >
          <Heart
            size={16}
            className={cn(
              'transition-colors duration-200',
              isWishlisted
                ? 'fill-[var(--color-gold)] stroke-[var(--color-gold)]'
                : 'stroke-[var(--color-warm-gray)] hover:stroke-[var(--color-ink)]'
            )}
          />
        </Button>
      </div>
    </article>
  );
}
