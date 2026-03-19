'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/ui/Button';

const words = ['Crafted', 'for', 'the', 'considered', 'life.'];

/** Full-viewport hero section with staggered headline animation and parallax-hint image. */
export default function HeroSection() {
  const prefersReduced = useReducedMotion();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/hero/hero-main.jpg"
        alt="Editorial fashion model in luxury cashmere coat"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[var(--color-ink)]/40" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-10 xl:px-16 pt-32 pb-section">
        {/* Eyebrow */}
        <motion.p
          className="font-body text-xs tracking-[0.3em] uppercase text-[var(--color-gold)] mb-6"
          initial={prefersReduced ? {} : { opacity: 0, y: 10 }}
          animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          New Collection — Spring 2026
        </motion.p>

        {/* Headline */}
        <h1 className="font-display font-light text-white max-w-[12ch] mb-6"
            style={{ fontSize: 'clamp(3rem, 8vw, 5rem)', lineHeight: 1.05, letterSpacing: '-0.02em' }}>
          {prefersReduced ? (
            words.join(' ')
          ) : (
            words.map((word, i) => (
              <motion.span
                key={i}
                className="inline-block mr-[0.25em]"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.4 + i * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {word}
              </motion.span>
            ))
          )}
        </h1>

        {/* Sub-headline */}
        <motion.p
          className="font-body text-white/70 text-base sm:text-lg max-w-[52ch] mb-10 leading-relaxed"
          initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
          animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.85 }}
        >
          Handcrafted pieces in natural materials. Made to last, designed to evolve with you.
        </motion.p>

        {/* CTA */}
        <motion.div
          className="flex flex-col sm:flex-row gap-3"
          initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
          animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <Link href="/shop">
            <button className="inline-flex items-center justify-center h-12 px-8 font-body text-sm tracking-wide
                               border border-white text-white hover:bg-[var(--color-ivory)] hover:text-[var(--color-ink)]
                               transition-all duration-300 rounded-sm">
              Shop the Collection
            </button>
          </Link>
          <Link href="/about">
            <Button variant="ghost" className="text-white/80 hover:text-white h-12">
              Our Story →
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Subtle scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        initial={prefersReduced ? {} : { opacity: 0 }}
        animate={prefersReduced ? {} : { opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        <span className="font-body text-2xs tracking-widest uppercase text-white/50">Scroll</span>
        <motion.div
          className="w-px h-8 bg-white/30"
          animate={prefersReduced ? {} : { scaleY: [1, 0.3, 1] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
}
