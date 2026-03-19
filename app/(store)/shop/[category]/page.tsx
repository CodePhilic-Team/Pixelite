import { products } from '@/lib/data/products';
import { categories } from '@/lib/data/categories';
import ProductGrid from '@/components/product/ProductGrid';
import PageWrapper from '@/components/layout/PageWrapper';
import AnimatedSection from '@/components/shared/AnimatedSection';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const cat = categories.find((c) => c.slug === category);
  if (!cat) notFound();

  const categoryProducts = products.filter((p) => p.category === category);

  return (
    <PageWrapper className="pt-32 pb-24">
      <AnimatedSection className="mb-10">
        <h1
          className="font-display font-light text-[var(--color-ink)] mb-2"
          style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.15 }}
        >
          {cat.name}
        </h1>
        <p className="font-body text-sm text-[var(--color-warm-gray)]">
          {cat.description}
        </p>
      </AnimatedSection>
      <ProductGrid products={categoryProducts} />
    </PageWrapper>
  );
}
