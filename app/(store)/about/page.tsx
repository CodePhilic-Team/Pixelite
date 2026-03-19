import Image from 'next/image';
import Link from 'next/link';
import PageWrapper from '@/components/layout/PageWrapper';
import AnimatedSection from '@/components/shared/AnimatedSection';
import Button from '@/components/ui/Button';
import Divider from '@/components/ui/Divider';

export const metadata = { title: 'Our Story' };

const values = [
  {
    title: 'Craftsmanship',
    description: 'Every piece made by hand, from makers who have spent decades perfecting their craft.',
    icon: '◇',
  },
  {
    title: 'Sustainability',
    description: 'Natural materials, ethical sourcing, zero-waste packaging. No compromises.',
    icon: '◇',
  },
  {
    title: 'Timelessness',
    description: 'We design for decades, not seasons. No trends. Only enduring form.',
    icon: '◇',
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <div className="relative min-h-[60vh] flex items-center overflow-hidden">
        <Image
          src="/images/hero/hero-main.jpg"
          alt="Editorial image representing the Pixelite brand"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[var(--color-ink)]/50" />
        <PageWrapper className="relative z-10 pt-32 pb-24">
          <AnimatedSection>
            <p className="font-body text-xs tracking-widest uppercase text-[var(--color-gold)] mb-4">
              Who we are
            </p>
            <h1
              className="font-display font-light text-white"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.05 }}
            >
              Our Story
            </h1>
          </AnimatedSection>
        </PageWrapper>
      </div>

      <PageWrapper className="py-24">
        {/* Brand story */}
        <AnimatedSection className="max-w-[65ch] mx-auto mb-24 text-center">
          <p className="font-display font-light italic text-[var(--color-charcoal)] text-2xl md:text-3xl leading-relaxed mb-8">
            &ldquo;We started Pixelite with a single belief: the things we own every day should be made as if they matter — because they do.&rdquo;
          </p>
          <p className="font-body text-sm text-[var(--color-warm-gray)] leading-relaxed">
            Founded in 2021, Pixelite began as a movement against disposability. We spent two years visiting
            ateliers in Portugal, Japan, and Scotland to identify makers who shared our obsession with
            longstanding quality. The result is a curated range of goods that improve with time, use, and care.
          </p>
        </AnimatedSection>

        <Divider className="mb-24" />

        {/* Values grid */}
        <div className="mb-24">
          <AnimatedSection className="text-center mb-14">
            <h2
              className="font-display font-light text-[var(--color-ink)]"
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)' }}
            >
              What we stand for
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <AnimatedSection key={v.title} delay={i * 0.08}>
                <div className="text-center p-8 border border-[var(--color-stone)]/60 rounded-sm">
                  <p className="text-[var(--color-gold)] text-2xl mb-4">{v.icon}</p>
                  <h3 className="font-display font-light text-xl text-[var(--color-ink)] mb-3">{v.title}</h3>
                  <p className="font-body text-sm text-[var(--color-warm-gray)] leading-relaxed">{v.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>

        {/* CTA */}
        <AnimatedSection className="text-center">
          <p className="font-body text-sm text-[var(--color-warm-gray)] mb-6">
            Every piece in our collection tells a story. Come find yours.
          </p>
          <Link href="/shop">
            <Button variant="primary">Shop the Collection</Button>
          </Link>
        </AnimatedSection>
      </PageWrapper>
    </>
  );
}
