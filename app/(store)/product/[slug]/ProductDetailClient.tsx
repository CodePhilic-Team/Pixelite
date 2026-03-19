'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Heart, Share2 } from 'lucide-react';
import { products } from '@/lib/data/products';
import { formatPrice } from '@/lib/utils/formatPrice';
import { useCart } from '@/lib/hooks/useCart';
import { useWishlistStore } from '@/lib/store/wishlist.store';
import ProductImages from '@/components/product/ProductImages';
import ProductOptions from '@/components/product/ProductOptions';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Divider from '@/components/ui/Divider';
import ProductGrid from '@/components/product/ProductGrid';
import PageWrapper from '@/components/layout/PageWrapper';
import AnimatedSection from '@/components/shared/AnimatedSection';
import type { ProductVariant } from '@/lib/types/product';
import type { Product } from '@/lib/types/product';

export interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product.variants.find((v) => v.inStock) ?? null
  );
  const [descOpen, setDescOpen] = useState(false);
  const { addItem } = useCart();
  const toggleWishlist = useWishlistStore((s) => s.toggleItem);
  const isWishlisted = useWishlistStore((s) => s.isWishlisted(product.id));

  const handleAddToCart = () => {
    if (!selectedVariant) return;
    addItem({
      productId: product.id,
      variantId: selectedVariant.id,
      name: product.name,
      imageSrc: product.images[0].src,
      priceInCents: product.priceInCents,
      variant: selectedVariant.label,
    });
  };

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <PageWrapper className="pt-28 pb-24">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 font-body text-xs text-[var(--color-warm-gray)]">
        <Link href="/shop" className="hover:text-[var(--color-charcoal)] transition-colors">Shop</Link>
        <span>/</span>
        <Link href={`/shop/${product.category}`} className="hover:text-[var(--color-charcoal)] transition-colors capitalize">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-[var(--color-charcoal)]">{product.name}</span>
      </nav>

      {/* Main layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16">
        {/* Gallery */}
        <AnimatedSection delay={0}>
          <ProductImages images={product.images} productName={product.name} />
        </AnimatedSection>

        {/* Info panel */}
        <AnimatedSection delay={0.1} className="flex flex-col gap-6">
          {product.brand && (
            <p className="font-body text-xs tracking-widest uppercase text-[var(--color-gold)]">
              {product.brand}
            </p>
          )}

          <div>
            {(product.isNew || product.isBestseller) && (
              <div className="flex gap-2 mb-3">
                {product.isNew && <Badge variant="new">New</Badge>}
                {product.isBestseller && <Badge variant="bestseller">Bestseller</Badge>}
              </div>
            )}
            <h1
              className="font-display font-light text-[var(--color-ink)] leading-tight"
              style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}
            >
              {product.name}
            </h1>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="font-mono text-xl text-[var(--color-charcoal)]">
              {formatPrice(product.priceInCents)}
            </span>
            {product.compareAtPriceInCents && (
              <span className="font-mono text-sm text-[var(--color-warm-gray)] line-through">
                {formatPrice(product.compareAtPriceInCents)}
              </span>
            )}
          </div>

          <Divider />

          <p className="font-body text-sm text-[var(--color-warm-gray)] leading-relaxed">
            {product.shortDescription}
          </p>

          <ProductOptions
            variants={product.variants}
            onSelect={(v) => setSelectedVariant(v)}
          />

          <div className="flex flex-col gap-3">
            <Button
              variant="primary"
              className="w-full h-12"
              onClick={handleAddToCart}
              disabled={!selectedVariant || !selectedVariant.inStock}
            >
              {selectedVariant?.inStock ? 'Add to Cart' : 'Out of Stock'}
            </Button>
            <div className="flex gap-2">
              <button
                onClick={() => toggleWishlist(product.id)}
                className="flex-1 h-11 flex items-center justify-center gap-2 border border-[var(--color-stone)]
                           font-body text-sm text-[var(--color-charcoal)] rounded-sm hover:border-[var(--color-charcoal)]
                           transition-all duration-200"
                aria-label={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
              >
                <Heart
                  size={16}
                  className={isWishlisted ? 'fill-[var(--color-gold)] stroke-[var(--color-gold)]' : ''}
                />
                {isWishlisted ? 'Wishlisted' : 'Save'}
              </button>
              <button
                className="h-11 w-11 flex items-center justify-center border border-[var(--color-stone)]
                           rounded-sm text-[var(--color-charcoal)] hover:border-[var(--color-charcoal)]
                           transition-all duration-200"
                aria-label="Share product"
              >
                <Share2 size={16} />
              </button>
            </div>
          </div>

          {product.stock <= 10 && product.stock > 0 && (
            <p className="font-body text-xs text-[var(--color-gold)]">
              Only {product.stock} left in stock.
            </p>
          )}

          <Divider />

          <div>
            <button
              onClick={() => setDescOpen((o) => !o)}
              className="flex w-full items-center justify-between font-body text-sm text-[var(--color-charcoal)]
                         hover:text-[var(--color-ink)] transition-colors py-1"
              aria-expanded={descOpen}
            >
              <span className="tracking-wide">Product Details</span>
              <span className="text-lg leading-none">{descOpen ? '−' : '+'}</span>
            </button>
            {descOpen && (
              <p className="mt-3 font-body text-sm text-[var(--color-warm-gray)] leading-relaxed">
                {product.description}
              </p>
            )}
          </div>
        </AnimatedSection>
      </div>

      {related.length > 0 && (
        <div className="mt-24">
          <AnimatedSection>
            <h2
              className="font-display font-light text-[var(--color-ink)] mb-10"
              style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)' }}
            >
              You may also like
            </h2>
          </AnimatedSection>
          <ProductGrid products={related} />
        </div>
      )}
    </PageWrapper>
  );
}
