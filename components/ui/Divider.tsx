import { cn } from '@/lib/utils/cn';

export interface DividerProps {
  className?: string;
  /** Gold accent line instead of stone */
  accent?: boolean;
}

export default function Divider({ className, accent = false }: DividerProps) {
  return (
    <hr
      className={cn(
        'border-0 h-px',
        accent ? 'bg-[var(--color-gold)]' : 'bg-[var(--color-stone)]',
        className
      )}
    />
  );
}
