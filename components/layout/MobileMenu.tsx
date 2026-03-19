'use client';

import Link from 'next/link';
import { X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import Button from '@/components/ui/Button';
import Divider from '@/components/ui/Divider';

interface NavLink { href: string; label: string; }

export interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: NavLink[];
}

/** Full-screen mobile menu drawer. */
export default function MobileMenu({ isOpen, onClose, links }: MobileMenuProps) {
  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // ESC to close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col bg-[var(--color-ink)] px-6 py-8"
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <div className="flex justify-between items-center mb-12">
            <span className="font-display text-xl tracking-widest uppercase text-white">Pixelite</span>
            <Button variant="icon" onClick={onClose} aria-label="Close menu" className="text-white">
              <X size={24} />
            </Button>
          </div>

          <nav className="flex flex-col gap-2">
            {links.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="block font-display text-4xl font-light text-white/90 hover:text-white
                             transition-colors duration-200 py-3"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          <div className="mt-auto">
            <Divider className="border-[var(--color-warm-gray)]/30 mb-6" />
            <div className="flex gap-6">
              <Link href="/about" onClick={onClose} className="font-body text-sm text-[var(--color-warm-gray)] hover:text-white transition-colors">Our Story</Link>
              <Link href="/contact" onClick={onClose} className="font-body text-sm text-[var(--color-warm-gray)] hover:text-white transition-colors">Contact</Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
