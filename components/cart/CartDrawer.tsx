'use client';

import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/lib/hooks/useCart';
import { formatPrice } from '@/lib/utils/formatPrice';
import Button from '@/components/ui/Button';
import Divider from '@/components/ui/Divider';

export default function CartDrawer() {
  const { isOpen, closeCart, items, removeItem, updateQuantity, totalItems, subtotalInCents } =
    useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-[var(--color-ink)]/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
            className="fixed right-0 top-0 bottom-0 z-50 flex w-full max-w-md flex-col
                       bg-[var(--color-ivory)] shadow-2xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[var(--color-stone)] px-6 py-5">
              <h2 className="font-body text-sm tracking-widest uppercase text-[var(--color-charcoal)]">
                Your Cart ({totalItems})
              </h2>
              <Button variant="icon" onClick={closeCart} aria-label="Close cart">
                <X size={20} />
              </Button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <ShoppingBag size={40} className="text-[var(--color-stone)]" strokeWidth={1} />
                  <p className="font-body text-sm text-[var(--color-warm-gray)]">
                    Your cart is empty.
                  </p>
                  <Button variant="outline" onClick={closeCart}>
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                <ul className="flex flex-col divide-y divide-[var(--color-stone)]/40">
                  {items.map((item) => (
                    <li key={`${item.productId}-${item.variantId}`} className="py-5 flex gap-4">
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-sm bg-[var(--color-cream)]">
                        <Image
                          src={item.imageSrc}
                          alt={item.name}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-body text-sm text-[var(--color-charcoal)] truncate">{item.name}</p>
                        {item.variant && (
                          <p className="font-body text-xs text-[var(--color-warm-gray)] mt-0.5">{item.variant}</p>
                        )}
                        <p className="font-mono text-sm text-[var(--color-charcoal)] mt-1">
                          {formatPrice(item.priceInCents)}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item.productId, item.variantId, item.quantity - 1)}
                            className="h-6 w-6 flex items-center justify-center border border-[var(--color-stone)] rounded-sm
                                       text-[var(--color-charcoal)] hover:bg-[var(--color-cream)] transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="font-mono text-sm w-6 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.variantId, item.quantity + 1)}
                            className="h-6 w-6 flex items-center justify-center border border-[var(--color-stone)] rounded-sm
                                       text-[var(--color-charcoal)] hover:bg-[var(--color-cream)] transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus size={12} />
                          </button>
                          <button
                            onClick={() => removeItem(item.productId, item.variantId)}
                            className="ml-2 font-body text-xs text-[var(--color-warm-gray)] hover:text-[var(--color-ink)]
                                       underline underline-offset-2 transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer summary */}
            {items.length > 0 && (
              <div className="border-t border-[var(--color-stone)] px-6 py-5 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-body text-sm text-[var(--color-charcoal)]">Subtotal</span>
                  <span className="font-mono text-base text-[var(--color-charcoal)]">
                    {formatPrice(subtotalInCents)}
                  </span>
                </div>
                <p className="font-body text-xs text-[var(--color-warm-gray)]">
                  Shipping and taxes calculated at checkout.
                </p>
                <Link href="/checkout" onClick={closeCart}>
                  <Button variant="primary" className="w-full">
                    Checkout
                  </Button>
                </Link>
                <Button variant="outline" className="w-full" onClick={closeCart}>
                  Continue Shopping
                </Button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
