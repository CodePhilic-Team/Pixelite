import { cn } from '@/lib/utils/cn';

export interface TagProps {
  children: React.ReactNode;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

/** Filter/category pill tag. Selected state uses filled charcoal. */
export default function Tag({ children, selected = false, onClick, className }: TagProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex items-center h-8 px-4 rounded-full font-body text-xs tracking-wide transition-colors duration-200 cursor-pointer',
        selected
          ? 'bg-[var(--color-charcoal)] text-[var(--color-ivory)]'
          : 'bg-[var(--color-cream)] text-[var(--color-charcoal)] hover:bg-[var(--color-stone)]',
        className
      )}
    >
      {children}
    </button>
  );
}
