'use client';

import { useState } from 'react';
import AnimatedSection from '@/components/shared/AnimatedSection';

/** Full-width dark newsletter section. */
export default function NewsletterBanner() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section className="bg-[var(--color-ink)] py-[6rem]">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 xl:px-16">
        <AnimatedSection className="max-w-[600px] mx-auto text-center">
          <p className="font-body text-xs tracking-widest uppercase text-[var(--color-gold)] mb-4">
            Join the Inner Circle
          </p>
          <h2
            className="font-display font-light text-[var(--color-ivory)] mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', lineHeight: 1.15 }}
          >
            Stay in the know.
          </h2>
          <p className="font-body text-sm text-[var(--color-warm-gray)] mb-10 max-w-[45ch] mx-auto leading-relaxed">
            New arrivals, editorial stories, and private sale access. Delivered rarely, never carelessly.
          </p>

          {submitted ? (
            <p className="font-body text-sm text-[var(--color-gold)] py-4">
              You&apos;re on the list. Thank you.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                aria-label="Email address for newsletter"
                className="flex-1 bg-transparent border-b border-[var(--color-warm-gray)] sm:border-r-0
                           text-[var(--color-ivory)] placeholder:text-[var(--color-warm-gray)]
                           font-body text-sm py-3 px-0 sm:pr-4
                           focus:border-[var(--color-gold)] focus:outline-none transition-colors duration-200"
              />
              <button
                type="submit"
                className="bg-[var(--color-gold)] text-[var(--color-ink)] font-body text-sm tracking-wide
                           px-8 py-3 hover:bg-[var(--color-gold-light)] transition-colors duration-200 shrink-0
                           mt-4 sm:mt-0"
              >
                Subscribe
              </button>
            </form>
          )}

          <p className="font-body text-xs text-[var(--color-warm-gray)]/60 mt-5">
            No spam. Unsubscribe anytime.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
