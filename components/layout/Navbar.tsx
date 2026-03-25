'use client';

import Link from 'next/link';
import { ShoppingBag, Search, Menu } from 'lucide-react';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils/cn';
import { useScrollDirection } from '@/lib/hooks/useScrollDirection';
import { useCart } from '@/lib/hooks/useCart';
import Button from '@/components/ui/Button';
import MobileMenu from './MobileMenu';

const navLinks = [
  { href: '/shop', label: 'Shop' },
  { href: '/shop/bags', label: 'Bags' },
  { href: '/shop/clothing', label: 'Clothing' },
  { href: '/about', label: 'Our Story' },
];

/**
 * Sticky Navbar.
 * - Transparent with white text when at top of page (hero mode).
 * - Becomes ivory/blur with dark text on scroll.
 * - Hides on scroll-down, re-appears on scroll-up.
 */
/** Pages where the navbar should start transparent with white text (has a full-bleed hero image). */
const HERO_PAGES = ['/', '/about'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const direction = useScrollDirection();
  const { totalItems, openCart } = useCart();
  const pathname = usePathname();

  const hasHero = HERO_PAGES.includes(pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /** True only when we're at the top of a hero page — show transparent/white mode. */
  const isTransparent = hasHero && !scrolled;

  const isHidden = direction === 'down' && scrolled && pathname !== "/shop"; //do not hide on shop page

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
          isTransparent
            ? 'bg-transparent'
            : 'bg-ivory/95 backdrop-blur-md border-b border-stone/40 shadow-sm',
          // isHidden ? '-translate-y-full' : 'translate-y-0'
        )}
      >
        <div className="mx-auto flex h-16 max-w-site items-center justify-between px-4 sm:px-6 lg:px-10 xl:px-16">
          {/* Logo */}
          <Link
            href="/"
            className={cn(
              'font-display text-xl tracking-widest uppercase transition-colors duration-200',
              isTransparent ? 'text-white' : 'text-ink'
            )}
          >
            Pixelite
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'font-body text-sm tracking-wide transition-colors duration-200',
                  'relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0',
                  'after:bg-current after:transition-all after:duration-300 hover:after:w-full',
                  isTransparent
                    ? 'text-white/90 hover:text-white'
                    : 'text-charcoal hover:text-ink'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right icons */}
          <div className="flex items-center gap-1">
            <Button
              variant="icon"
              aria-label="Search"
              className={cn(isTransparent ? 'text-white' : 'text-charcoal')}
            >
              <Search size={18} />
            </Button>

            {/* Cart */}
            <Button
              variant="icon"
              aria-label={`Shopping cart, ${totalItems} items`}
              className={cn('relative', isTransparent ? 'text-white' : 'text-charcoal')}
              onClick={openCart}
            >
              <ShoppingBag size={18} />
              {totalItems > 0 && (
                <span
                  className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center
                             rounded-full bg-gold font-mono text-2xs text-ink"
                  aria-live="polite"
                >
                  {totalItems > 9 ? '9+' : totalItems}
                </span>
              )}
            </Button>

            {/* Hamburger — mobile only */}
            <Button
              variant="icon"
              aria-label="Open navigation menu"
              className={cn('md:hidden', isTransparent ? 'text-white' : 'text-charcoal')}
              onClick={() => setMobileOpen(true)}
            >
              <Menu size={20} />
            </Button>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} links={navLinks} />
    </>
  );
}
