'use client';

import { useWishlistStore } from '@/lib/store/wishlist.store';
import { products } from '@/lib/data/products';
import ProductGrid from '@/components/product/ProductGrid';
import PageWrapper from '@/components/layout/PageWrapper';
import AnimatedSection from '@/components/shared/AnimatedSection';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { Heart } from 'lucide-react';

export default function WishlistPage() {
  const productIds = useWishlistStore((s) => s.productIds);
  const wishlisted = products.filter((p) => productIds.includes(p.id));

  return (
    <PageWrapper className="pt-32 pb-24">
      <AnimatedSection className="mb-10">
        <h1 className="font-display font-light text-[var(--color-ink)]"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
          Your Wishlist
        </h1>
      </AnimatedSection>

      {wishlisted.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
          <Heart size={48} className="text-[var(--color-stone)] mb-6" strokeWidth={1} />
          <p className="font-body text-sm text-[var(--color-warm-gray)] mb-8">
            Your wishlist is empty. Save pieces you love.
          </p>
          <Link href="/shop">
            <Button variant="primary">Explore the Collection</Button>
          </Link>
        </div>
      ) : (
        <ProductGrid products={wishlisted} />
      )}
    </PageWrapper>
  );
}
