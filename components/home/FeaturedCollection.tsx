import Link from 'next/link';
import Image from 'next/image';
import { products } from '@/lib/data/products';
import { formatPrice } from '@/lib/utils/formatPrice';
import AnimatedSection from '@/components/shared/AnimatedSection';
import styles from './FeaturedCollection.module.css';

/** Asymmetric 4-product editorial grid featuring the top bestsellers. */
export default function FeaturedCollection() {
  const featured = products.filter((p) => p.isBestseller).slice(0, 4);

  return (
    <section className="py-[6rem] px-4 sm:px-6 lg:px-10 xl:px-16 mx-auto w-full max-w-site">
      {/* Section header */}
      <AnimatedSection className="flex items-end justify-between mb-12">
        <div className="w-full md:w-auto">
          <p className="font-body text-xs tracking-widest uppercase text-gold mb-3">
            Signature Pieces
          </p>
          <h2 className="font-display font-light text-ink"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.15 }}>
            Featured Collection
          </h2>
        </div>
        <Link
          href="/shop"
          className="hidden md:flex font-body text-sm text-warm-gray hover:text-ink
                     transition-colors duration-200 underline-offset-4 hover:underline"
        >
          View All →
        </Link>
      </AnimatedSection>

      {/* Asymmetric Bento grid with grid-template-areas */}
      <div className={`${styles.bentoGrid} mt-8`}>
        {featured[0] && (
          <AnimatedSection delay={0.05} className={`${styles.card1} h-full w-full`}>
            <FeaturedItem product={featured[0]} priority={true} />
          </AnimatedSection>
        )}
        {featured[1] && (
          <AnimatedSection delay={0.1} className={`${styles.card2} h-full w-full`}>
            <FeaturedItem product={featured[1]} />
          </AnimatedSection>
        )}
        {featured[2] && (
          <AnimatedSection delay={0.15} className={`${styles.card3} h-full w-full`}>
            <FeaturedItem product={featured[2]} />
          </AnimatedSection>
        )}
        {featured[3] && (
          <AnimatedSection delay={0.2} className={`${styles.card4} h-full w-full`}>
            <FeaturedItem product={featured[3]} />
          </AnimatedSection>
        )}
      </div>

      <div className="mt-12 md:hidden text-center w-full">
        <Link href="/shop" className="font-body text-sm text-charcoal underline underline-offset-4">
          View All Products →
        </Link>
      </div>
    </section>
  );
}

function FeaturedItem({
  product,
  priority = false,
}: {
  product: (typeof products)[0];
  priority?: boolean;
}) {
  return (
    <Link 
      href={`/product/${product.slug}`} 
      className="group block relative h-full w-full overflow-hidden rounded-4xl bg-cream shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 will-change-transform"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={product.images[0].src}
          alt={product.images[0].alt}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
        />
        {/* Premium Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-ink/90 via-ink/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]">
          <h3 className="font-display font-light text-white text-2xl md:text-3xl lg:text-4xl leading-snug">
            {product.name}
          </h3>
          <p className="font-mono text-sm tracking-wide text-gold-light mt-2">
            {formatPrice(product.priceInCents)}
          </p>
          
          {/* Animated Shop Now button */}
          <div className="mt-5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 hidden md:block">
            <span className="inline-flex items-center gap-2 font-body text-xs uppercase tracking-widest text-white border-b border-white/30 pb-1 group-hover:border-white transition-colors duration-300">
              Shop Now 
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform group-hover:translate-x-1 transition-transform duration-300">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </div>
          
          {/* Mobile persistent button */}
          <div className="mt-4 md:hidden">
            <span className="inline-flex items-center gap-2 font-body text-xs uppercase tracking-widest text-white/80">
              Shop Now →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
