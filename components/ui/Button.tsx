'use client';

import { cn } from '@/lib/utils/cn';
import type { ButtonHTMLAttributes } from 'react';

export type ButtonVariant = 'primary' | 'outline' | 'ghost' | 'icon';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  /** Additional Tailwind classes */
  className?: string;
}

/**
 * Base button component with four variants matching the design system.
 * primary: filled charcoal, gold border on hover
 * outline: transparent with charcoal border, fills on hover
 * ghost: text only with animated underline
 * icon: no bg, no padding — wraps a single icon
 */
export default function Button({
  variant = 'primary',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        // Base
        'inline-flex items-center justify-center gap-2 font-body text-sm tracking-wide transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed',
        // Variants
        variant === 'primary' && [
          'h-11 px-7 bg-[var(--color-charcoal)] text-[var(--color-ivory)] rounded-sm',
          'hover:bg-[var(--color-ink)] focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]',
        ],
        variant === 'outline' && [
          'h-11 px-7 border border-[var(--color-charcoal)] text-[var(--color-charcoal)] rounded-sm',
          'hover:bg-[var(--color-charcoal)] hover:text-[var(--color-ivory)]',
        ],
        variant === 'ghost' && [
          'h-auto px-0 py-0.5 text-[var(--color-charcoal)] underline-offset-4',
          'hover:underline hover:text-[var(--color-ink)]',
        ],
        variant === 'icon' && [
          'h-9 w-9 p-0 text-[var(--color-warm-gray)] rounded-sm',
          'hover:text-[var(--color-ink)] hover:bg-[var(--color-cream)]',
        ],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
