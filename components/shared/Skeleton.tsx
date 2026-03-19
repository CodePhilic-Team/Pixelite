import { cn } from '@/lib/utils/cn';

export interface SkeletonProps {
  className?: string;
}

/** Shimmer skeleton block. Wrap in a sized container. */
export function Skeleton({ className }: SkeletonProps) {
  return (
    <div className={cn('animate-shimmer rounded-sm bg-[var(--color-cream)]', className)} />
  );
}

/** Skeleton matching a ProductCard */
export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col">
      <div className="aspect-[4/5] animate-shimmer rounded-sm bg-[var(--color-cream)]" />
      <div className="mt-3 h-4 w-3/4 animate-shimmer rounded bg-[var(--color-cream)]" />
      <div className="mt-1 h-4 w-1/3 animate-shimmer rounded bg-[var(--color-cream)]" />
    </div>
  );
}
