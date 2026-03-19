'use client';

import { useCart } from '@/lib/hooks/useCart';
import { formatPrice } from '@/lib/utils/formatPrice';
import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, ShoppingBag } from 'lucide-react';
import Button from '@/components/ui/Button';
import PageWrapper from '@/components/layout/PageWrapper';
import AnimatedSection from '@/components/shared/AnimatedSection';

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalItems, subtotalInCents } = useCart();

  if (items.length === 0) {
    return (
      <PageWrapper className="pt-32 pb-24 flex flex-col items-center justify-center min-h-[60vh] text-center">
        <ShoppingBag size={48} className="text-[var(--color-stone)] mb-6" strokeWidth={1} />
        <h1 className="font-display font-light text-3xl text-[var(--color-ink)] mb-3">Your cart is empty</h1>
        <p className="font-body text-sm text-[var(--color-warm-gray)] mb-10">Add some pieces to get started.</p>
        <Link href="/shop">
          <Button variant="primary">Shop Now</Button>
        </Link>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper className="pt-32 pb-24">
      <AnimatedSection>
        <h1 className="font-display font-light text-[var(--color-ink)] mb-10"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
          Your Cart ({totalItems})
        </h1>
      </AnimatedSection>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Items */}
        <div className="lg:col-span-2 divide-y divide-[var(--color-stone)]/40">
          {items.map((item, i) => (
            <AnimatedSection key={`${item.productId}-${item.variantId}`} delay={i * 0.05} className="py-6 flex gap-6">
              <div className="relative h-28 w-24 shrink-0 overflow-hidden rounded-sm bg-[var(--color-cream)]">
                <Image src={item.imageSrc} alt={item.name} fill sizes="96px" className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-body text-sm font-medium text-[var(--color-charcoal)]">{item.name}</p>
                {item.variant && (
                  <p className="font-body text-xs text-[var(--color-warm-gray)] mt-0.5">{item.variant}</p>
                )}
                <p className="font-mono text-sm text-[var(--color-charcoal)] mt-1">{formatPrice(item.priceInCents)}</p>
                <div className="flex items-center gap-2 mt-3">
                  <button onClick={() => updateQuantity(item.productId, item.variantId, item.quantity - 1)}
                    className="h-7 w-7 border border-[var(--color-stone)] rounded-sm flex items-center justify-center hover:bg-[var(--color-cream)] transition-colors">
                    <Minus size={12} />
                  </button>
                  <span className="font-mono text-sm w-6 text-center">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.productId, item.variantId, item.quantity + 1)}
                    className="h-7 w-7 border border-[var(--color-stone)] rounded-sm flex items-center justify-center hover:bg-[var(--color-cream)] transition-colors">
                    <Plus size={12} />
                  </button>
                  <button onClick={() => removeItem(item.productId, item.variantId)}
                    className="ml-3 font-body text-xs text-[var(--color-warm-gray)] underline underline-offset-2 hover:text-[var(--color-ink)] transition-colors">
                    Remove
                  </button>
                </div>
              </div>
              <p className="font-mono text-sm text-[var(--color-charcoal)] shrink-0">
                {formatPrice(item.priceInCents * item.quantity)}
              </p>
            </AnimatedSection>
          ))}
        </div>

        {/* Summary */}
        <AnimatedSection delay={0.1} className="lg:sticky lg:top-24 h-fit">
          <div className="border border-[var(--color-stone)] rounded-sm p-6 flex flex-col gap-4">
            <h2 className="font-body text-sm tracking-widest uppercase text-[var(--color-charcoal)]">Order Summary</h2>
            <div className="flex justify-between font-body text-sm text-[var(--color-charcoal)]">
              <span>Subtotal</span>
              <span className="font-mono">{formatPrice(subtotalInCents)}</span>
            </div>
            <div className="flex justify-between font-body text-sm text-[var(--color-warm-gray)]">
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>
            <div className="border-t border-[var(--color-stone)] pt-4 flex justify-between font-mono text-base text-[var(--color-charcoal)]">
              <span className="font-body">Total</span>
              <span>{formatPrice(subtotalInCents)}</span>
            </div>
            <Link href="/checkout">
              <Button variant="primary" className="w-full">Proceed to Checkout</Button>
            </Link>
            <Link href="/shop">
              <Button variant="outline" className="w-full">Continue Shopping</Button>
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </PageWrapper>
  );
}
