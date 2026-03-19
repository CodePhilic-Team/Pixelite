import { cn } from '@/lib/utils/cn';

export interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
}

/** Consistent horizontal padding + max-width centering for all page content. */
export default function PageWrapper({ children, className }: PageWrapperProps) {
  return (
    <main
      className={cn(
        'mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-10 xl:px-16',
        className
      )}
    >
      {children}
    </main>
  );
}
