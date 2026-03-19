import type { Product } from '@/lib/types/product';
import ProductCard from './ProductCard';
import AnimatedSection from '@/components/shared/AnimatedSection';
import { cn } from '@/lib/utils/cn';

export interface ProductGridProps {
  products: Product[];
  className?: string;
}

/** Responsive product grid: 2 cols mobile → 3 md → 4 xl. */
export default function ProductGrid({ products, className }: ProductGridProps) {
  return (
    <section
      className={cn('grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 xl:grid-cols-4 xl:gap-8', className)}
    >
      {products.map((product, i) => (
        <AnimatedSection key={product.id} delay={Math.min(i * 0.05, 0.3)}>
          <ProductCard product={product} />
        </AnimatedSection>
      ))}
    </section>
  );
}
