import { cn } from '@/lib/utils/cn';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'new' | 'sale' | 'bestseller' | 'limited';
  className?: string;
}

const variantStyles = {
  new: 'bg-[var(--color-charcoal)] text-[var(--color-ivory)]',
  sale: 'bg-[var(--color-gold)] text-[var(--color-ink)]',
  bestseller: 'bg-[var(--color-cream)] text-[var(--color-charcoal)]',
  limited: 'bg-[var(--color-ink)] text-[var(--color-ivory)]',
};

export default function Badge({ children, variant = 'new', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-block font-body text-2xs tracking-widest uppercase px-2.5 py-1 rounded-sm',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
