'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { products } from '@/lib/data/products';
import { categories } from '@/lib/data/categories';
import ProductGrid from '@/components/product/ProductGrid';
import Tag from '@/components/ui/Tag';
import PageWrapper from '@/components/layout/PageWrapper';
import AnimatedSection from '@/components/shared/AnimatedSection';

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
];

function sortProducts(prods: typeof products, sort: string) {
  switch (sort) {
    case 'price-asc': return [...prods].sort((a, b) => a.priceInCents - b.priceInCents);
    case 'price-desc': return [...prods].sort((a, b) => b.priceInCents - a.priceInCents);
    case 'newest': return [...prods].filter((p) => p.isNew).concat(prods.filter((p) => !p.isNew));
    default: return prods;
  }
}

/** Client component that reads URL search params for filter/sort state.
 *  Must be rendered inside a <Suspense> boundary in the parent page. */
export default function ShopContent() {
  const router = useRouter();
  const params = useSearchParams();
  const category = params.get('category') ?? '';
  const sort = params.get('sort') ?? 'featured';

  const update = useCallback(
    (key: string, value: string) => {
      const next = new URLSearchParams(params.toString());
      if (value) next.set(key, value); else next.delete(key);
      router.replace(`/shop?${next.toString()}`, { scroll: false });
    },
    [params, router]
  );

  const filtered = category ? products.filter((p) => p.category === category) : products;
  const sorted = sortProducts(filtered, sort);

  return (
    <PageWrapper className="pt-32 pb-24">
      {/* Page header */}
      <AnimatedSection className="mb-10">
        <h1
          className="font-display font-light text-ink mb-2"
          style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.15 }}
        >
          {category ? categories.find((c) => c.slug === category)?.name ?? 'Shop' : 'All Products'}
        </h1>
        <p className="font-body text-sm text-warm-gray">{sorted.length} products</p>
      </AnimatedSection>

      {/* Filter/Sort bar */}
      <div className="sticky top-16 z-30 bg-ivory/95 backdrop-blur-sm border-b border-stone/40 py-3 mb-10 -mx-4 sm:-mx-6 lg:-mx-10 xl:-mx-16 px-4 sm:px-6 lg:px-10 xl:px-16">
        <div className="flex flex-wrap items-center gap-2 justify-between">
          {/* Category tags */}
          <div className="flex flex-wrap gap-2">
            <Tag selected={!category} onClick={() => update('category', '')}>All</Tag>
            {categories.map((cat) => (
              <Tag
                key={cat.slug}
                selected={category === cat.slug}
                onClick={() => update('category', category === cat.slug ? '' : cat.slug)}
              >
                {cat.name}
              </Tag>
            ))}
          </div>

          {/* Sort dropdown */}
          <select
            value={sort}
            onChange={(e) => update('sort', e.target.value)}
            aria-label="Sort products"
            className="font-body text-xs border border-stone bg-transparent text-charcoal
                       rounded-sm px-3 py-1.5 focus:outline-none focus:border-gold
                       cursor-pointer"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Product grid */}
      {sorted.length > 0 ? (
        <ProductGrid products={sorted} />
      ) : (
        <div className="text-center py-24">
          <p className="font-body text-warm-gray">No products found.</p>
        </div>
      )}
    </PageWrapper>
  );
}
