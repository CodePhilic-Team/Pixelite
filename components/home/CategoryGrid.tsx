import Link from 'next/link';
import Image from 'next/image';
import { categories } from '@/lib/data/categories';
import AnimatedSection from '@/components/shared/AnimatedSection';

/** Editorial category tile grid — 2×2 on desktop, stacked on mobile. */
export default function CategoryGrid() {
  return (
    <section className="py-[6rem] bg-[var(--color-cream)]">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 xl:px-16">
        <AnimatedSection className="text-center mb-12">
          <p className="font-body text-xs tracking-widest uppercase text-[var(--color-gold)] mb-3">
            Browse by Category
          </p>
          <h2
            className="font-display font-light text-[var(--color-ink)]"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', lineHeight: 1.2 }}
          >
            Shop the Collection
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {categories.map((cat, i) => (
            <AnimatedSection key={cat.id} delay={i * 0.07}>
              <Link
                href={`/shop/${cat.slug}`}
                className="group relative overflow-hidden rounded-sm block aspect-[3/4] bg-[var(--color-stone)]"
              >
                <Image
                  src={cat.imageSrc}
                  alt={cat.imageAlt}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* Base overlay */}
                <div className="absolute inset-0 bg-[var(--color-ink)]/20 transition-opacity duration-300 group-hover:bg-[var(--color-ink)]/50" />

                {/* Category name */}
                <div className="absolute inset-0 flex flex-col items-center justify-end pb-8 px-4">
                  <h3 className="font-display font-light text-white text-xl md:text-2xl text-center leading-tight">
                    {cat.name}
                  </h3>
                  {/* Animated underline */}
                  <span
                    className="block mt-2 h-px bg-white w-0 group-hover:w-2/3 transition-all duration-500 ease-out"
                    aria-hidden="true"
                  />
                  <p className="font-body text-xs text-white/60 mt-2 tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {cat.productCount} pieces
                  </p>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
