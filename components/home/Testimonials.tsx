import { testimonials } from '@/lib/data/testimonials';
import AnimatedSection from '@/components/shared/AnimatedSection';

/** Minimal testimonial quote cards — initials only, no star ratings. */
export default function Testimonials() {
  return (
    <section className="py-[6rem] mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 xl:px-16">
      <AnimatedSection className="text-center mb-14">
        <p className="font-body text-xs tracking-widest uppercase text-[var(--color-gold)] mb-3">
          What Our Customers Say
        </p>
        <h2
          className="font-display font-light text-[var(--color-ink)]"
          style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', lineHeight: 1.2 }}
        >
          Trusted by those who care
        </h2>
      </AnimatedSection>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {testimonials.map((t, i) => (
          <AnimatedSection key={t.id} delay={i * 0.07}>
            <blockquote className="flex flex-col gap-6 p-6 border border-[var(--color-stone)]/60 rounded-sm h-full">
              {/* Gold opening quote */}
              <span className="font-display text-5xl text-[var(--color-gold)] leading-none">&ldquo;</span>
              <p className="font-body text-sm text-[var(--color-charcoal)] leading-relaxed flex-1 -mt-4">
                {t.quote}
              </p>
              <footer className="flex items-center gap-3 pt-4 border-t border-[var(--color-stone)]/40">
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full
                             bg-[var(--color-charcoal)] text-[var(--color-ivory)] font-mono text-xs"
                >
                  {t.initials}
                </div>
                <div>
                  <p className="font-body text-sm font-medium text-[var(--color-charcoal)]">{t.author}</p>
                  <p className="font-body text-xs text-[var(--color-warm-gray)]">{t.location}</p>
                </div>
              </footer>
            </blockquote>
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}
