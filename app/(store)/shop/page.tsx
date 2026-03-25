import { Suspense } from 'react';
import ShopContent from './ShopContent';
import PageWrapper from '@/components/layout/PageWrapper';

/** Static-compatible page shell — wraps the client ShopContent in Suspense.
 *  Required because useSearchParams() causes a CSR bailout without this boundary. */
export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <PageWrapper className="pt-32 pb-24">
          <div className="h-10 w-48 bg-cream animate-pulse rounded mb-10" />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-3">
                <div className="aspect-4/5 bg-cream animate-pulse rounded-sm" />
                <div className="h-4 w-3/4 bg-cream animate-pulse rounded" />
                <div className="h-4 w-1/3 bg-cream animate-pulse rounded" />
              </div>
            ))}
          </div>
        </PageWrapper>
      }
    >
      <ShopContent />
    </Suspense>
  );
}

