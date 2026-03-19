import Link from 'next/link';
import Image from 'next/image';
import { products } from '@/lib/data/products';
import { formatPrice } from '@/lib/utils/formatPrice';
import AnimatedSection from '@/components/shared/AnimatedSection';

/** Asymmetric 3-product editorial grid featuring the top bestsellers. */
export default function FeaturedCollection() {
  const featured = products.filter((p) => p.isBestseller).slice(0, 3);

  return (
    <section className="py-[6rem] px-4 sm:px-6 lg:px-10 xl:px-16 mx-auto max-w-[1440px]">
      {/* Section header */}
      <AnimatedSection className="flex items-end justify-between mb-12">
        <div>
          <p className="font-body text-xs tracking-widest uppercase text-[var(--color-gold)] mb-3">
            Signature Pieces
          </p>
          <h2 className="font-display font-light text-[var(--color-ink)]"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.15 }}>
            Featured Collection
          </h2>
        </div>
        <Link
          href="/shop"
          className="hidden md:flex font-body text-sm text-[var(--color-warm-gray)] hover:text-[var(--color-ink)]
                     transition-colors duration-200 underline-offset-4 hover:underline"
        >
          View All →
        </Link>
      </AnimatedSection>

      {/* Asymmetric grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {/* Large left item (spans 2 rows) */}
        {featured[0] && (
          <AnimatedSection delay={0.05} className="md:row-span-2">
            <FeaturedItem product={featured[0]} size="large" />
          </AnimatedSection>
        )}
        {/* Two right items */}
        {featured[1] && (
          <AnimatedSection delay={0.1}>
            <FeaturedItem product={featured[1]} size="small" />
          </AnimatedSection>
        )}
        {featured[2] && (
          <AnimatedSection delay={0.15}>
            <FeaturedItem product={featured[2]} size="small" />
          </AnimatedSection>
        )}
      </div>

      <div className="mt-8 md:hidden text-center">
        <Link href="/shop" className="font-body text-sm text-[var(--color-charcoal)] underline underline-offset-4">
          View All Products →
        </Link>
      </div>
    </section>
  );
}

function FeaturedItem({
  product,
  size,
}: {
  product: (typeof products)[0];
  size: 'large' | 'small';
}) {
  return (
    <Link href={`/product/${product.slug}`} className="group block relative overflow-hidden rounded-sm bg-[var(--color-cream)]">
      <div className={size === 'large' ? 'aspect-[4/5] md:aspect-[3/4]' : 'aspect-[4/5]'}>
        <Image
          src={product.images[0].src}
          alt={product.images[0].alt}
          fill
          sizes={size === 'large' ? '(max-width:768px) 100vw, 55vw' : '(max-width:768px) 100vw, 45vw'}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/60 via-transparent to-transparent" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <p className="font-display font-light text-white text-xl md:text-2xl leading-snug">
          {product.name}
        </p>
        <p className="font-mono text-sm text-[var(--color-gold-light)] mt-1">
          {formatPrice(product.priceInCents)}
        </p>
        <p className="font-body text-xs text-white/70 mt-3 tracking-wide group-hover:text-white transition-colors duration-200">
          Shop Now →
        </p>
      </div>
    </Link>
  );
}
