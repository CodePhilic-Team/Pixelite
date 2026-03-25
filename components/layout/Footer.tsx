'use client';

import Link from 'next/link';
import { Instagram } from 'lucide-react';

function PinterestIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.236 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.181-.78 1.172-4.97 1.172-4.97s-.299-.598-.299-1.482c0-1.389.806-2.428 1.808-2.428.853 0 1.267.641 1.267 1.408 0 .858-.546 2.141-.828 3.33-.236.995.499 1.806 1.476 1.806 1.771 0 2.963-2.297 2.963-5.022 0-2.073-1.356-3.604-3.798-3.604-2.763 0-4.497 2.066-4.497 4.38 0 .796.236 1.369.606 1.8.167.199.189.279.129.507-.044.167-.146.569-.188.729-.06.228-.245.309-.449.225-1.254-.51-1.841-1.877-1.841-3.41 0-2.536 2.145-5.6 6.393-5.6 3.455 0 5.733 2.522 5.733 5.226 0 3.583-1.972 6.248-4.9 6.248-0.981 0-1.906-.527-2.222-1.118l-.604 2.32c-.22.845-.808 1.895-1.202 2.538.907.28 1.867.432 2.862.432 5.523 0 10-4.477 10-10S17.523 2 12 2z"/>
    </svg>
  );
} 
import Divider from '@/components/ui/Divider';

/** Three-column desktop footer on bg-ink. */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-ink text-stone">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-10 xl:px-16 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* Col 1: Brand */}
          <div>
            <Link
              href="/"
              className="font-display text-2xl tracking-widest uppercase text-ivory block mb-3"
            >
              Pixelite
            </Link>
            <p className="font-body text-sm leading-relaxed text-warm-gray max-w-[28ch]">
              Premium curated goods. Handcrafted with intention for the considered life.
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Instagram"
                className="text-[var(--color-warm-gray)] hover:text-[var(--color-gold)] transition-colors duration-200"
              >
                <Instagram size={18} strokeWidth={1.5} />
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Pinterest"
                className="text-[var(--color-warm-gray)] hover:text-[var(--color-gold)] transition-colors duration-200"
              >
                <PinterestIcon size={18} />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h3 className="font-body text-xs tracking-widest uppercase text-[var(--color-ivory)] mb-5">
              Navigate
            </h3>
            <ul className="flex flex-col gap-3">
              {[
                { href: '/shop', label: 'Shop All' },
                { href: '/shop/bags', label: 'Bags' },
                { href: '/shop/clothing', label: 'Clothing' },
                { href: '/shop/accessories', label: 'Accessories' },
                { href: '/about', label: 'Our Story' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-[var(--color-warm-gray)] hover:text-[var(--color-gold-light)] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Newsletter */}
          <div>
            <h3 className="font-body text-xs tracking-widest uppercase text-[var(--color-ivory)] mb-5">
              Stay in the know
            </h3>
            <p className="font-body text-sm text-[var(--color-warm-gray)] mb-4">
              Free shipping on orders over $150.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                placeholder="Your email"
                aria-label="Email address for newsletter"
                className="flex-1 bg-transparent border-b border-[var(--color-warm-gray)] text-[var(--color-ivory)]
                           placeholder:text-[var(--color-warm-gray)] font-body text-sm py-2
                           focus:border-[var(--color-gold)] focus:outline-none transition-colors duration-200"
              />
              <button
                type="submit"
                className="font-body text-sm tracking-wide bg-[var(--color-gold)] text-[var(--color-ink)]
                           px-5 py-2 hover:bg-[var(--color-gold-light)] transition-colors duration-200 shrink-0"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <Divider className="mt-12 mb-6 bg-[var(--color-warm-gray)]/20" />

        <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
          <p className="font-body text-xs text-[var(--color-warm-gray)]">
            &copy; {currentYear} Pixelite. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="font-body text-xs text-[var(--color-warm-gray)] hover:text-[var(--color-stone)] transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="font-body text-xs text-[var(--color-warm-gray)] hover:text-[var(--color-stone)] transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
