import Image from 'next/image';
import AnimatedSection from '@/components/shared/AnimatedSection';
import styles from './OverviewSection.module.css';

/**
 * OverviewSection — brand snapshot using a bento grid.
 * Highlights: key brand stats, a pull quote, the craft story card, and a shipping promise.
 */
export default function OverviewSection() {
  return (
    <section className="py-[6rem] px-4 sm:px-6 lg:px-10 xl:px-16 mx-auto w-full max-w-site">
      {/* Section header */}
      <AnimatedSection className="mb-12">
        <p className="font-body text-xs tracking-widest uppercase text-gold mb-3">
          Who We Are
        </p>
        <h2
          className="font-display font-light text-ink"
          style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.15 }}
        >
          Built on Craft,<br />Rooted in Purpose
        </h2>
      </AnimatedSection>

      {/* Bento grid */}
      <div className={styles.grid}>

        {/* Stat 1 */}
        <AnimatedSection delay={0.05} className={`${styles.stat1} h-full`}>
          <div className={`${styles.card} ${styles.cardCream}`}>
            <span className="font-body text-2xs tracking-widest uppercase text-warm-gray">
              Founded
            </span>
            <div>
              <p
                className="font-display font-light text-ink"
                style={{ fontSize: 'clamp(3rem, 7vw, 5rem)', lineHeight: 1 }}
              >
                2014
              </p>
              <p className="font-body text-sm text-warm-gray mt-2">
                A decade of considered design.
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* Stat 2 */}
        <AnimatedSection delay={0.1} className={`${styles.stat2} h-full`}>
          <div className={`${styles.card} ${styles.cardGold}`}>
            <span className="font-body text-2xs tracking-widest uppercase text-ink/60">
              Products
            </span>
            <div>
              <p
                className="font-display font-light text-ink"
                style={{ fontSize: 'clamp(3rem, 7vw, 5rem)', lineHeight: 1 }}
              >
                200+
              </p>
              <p className="font-body text-sm text-ink/70 mt-2">
                Curated, never compromised.
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* Pull quote */}
        <AnimatedSection delay={0.15} className={`${styles.quote} h-full`}>
          <div className={`${styles.card} ${styles.cardInk}`}>
            <span className="font-body text-2xs tracking-widest uppercase text-stone/60">
              Our Philosophy
            </span>
            <blockquote>
              <p
                className="font-display font-light text-ivory leading-snug"
                style={{ fontSize: 'clamp(1.35rem, 2.5vw, 1.85rem)' }}
              >
                "We believe the things you live with should be made to last — crafted with intention, chosen with care."
              </p>
              <footer className="font-body text-xs text-stone mt-4 tracking-wide">
                — Pixelite Founding Principle
              </footer>
            </blockquote>
          </div>
        </AnimatedSection>

        {/* Craft image card */}
        <AnimatedSection delay={0.2} className={`${styles.craft} h-full`}>
          <div className={styles.craftCard}>
            <Image
              src="/images/hero/hero-3.jpg"
              alt="Artisan hands crafting a leather good"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw"
              className={`object-cover ${styles.craftImage}`}
            />
            <div className={styles.craftOverlay}>
              <p className="font-body text-2xs tracking-widest uppercase text-stone/70 mb-3">
                The Craft
              </p>
              <h3
                className="font-display font-light text-ivory leading-snug"
                style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}
              >
                Handmade in small<br />batches, always.
              </h3>
              <p className="font-body text-sm text-stone mt-4 max-w-[42ch]">
                Every piece that leaves our ateliers is touched by skilled hands — no shortcuts, no mass production. Just honest materials and honest work.
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* Stat 3 */}
        <AnimatedSection delay={0.25} className={`${styles.stat3} h-full`}>
          <div className={`${styles.card} ${styles.cardWarm}`}>
            <span className="font-body text-2xs tracking-widest uppercase text-stone/60">
              Artisans
            </span>
            <div>
              <p
                className="font-display font-light text-ivory"
                style={{ fontSize: 'clamp(3rem, 7vw, 5rem)', lineHeight: 1 }}
              >
                48
              </p>
              <p className="font-body text-sm text-stone mt-2">
                Makers across 6 countries.
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* Shipping promise */}
        <AnimatedSection delay={0.3} className={`${styles.shipping} h-full`}>
          <div className={`${styles.card} ${styles.cardCream}`}>
            <span className="font-body text-2xs tracking-widest uppercase text-warm-gray">
              Our Promise
            </span>
            <div className="flex flex-col gap-3 mt-2">
              {[
                { icon: '✦', label: 'Free worldwide shipping over $150' },
                { icon: '✦', label: '60-day no-questions returns' },
                { icon: '✦', label: 'Carbon-neutral packaging' },
              ].map(({ icon, label }) => (
                <div key={label} className="flex items-start gap-3">
                  <span className="text-gold text-xs mt-0.5 shrink-0">{icon}</span>
                  <p className="font-body text-sm text-charcoal">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

      </div>
    </section>
  );
}
