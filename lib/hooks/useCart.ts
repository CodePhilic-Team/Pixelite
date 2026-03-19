'use client';

import { useCartStore } from '@/lib/store/cart.store';
import type { CartItem } from '@/lib/types/cart';

/**
 * Convenience hook exposing cart actions and derived state.
 */
export function useCart() {
  const items = useCartStore((s) => s.items);
  const isOpen = useCartStore((s) => s.isOpen);
  const openCart = useCartStore((s) => s.openCart);
  const closeCart = useCartStore((s) => s.closeCart);
  const addItem = useCartStore((s) => s.addItem);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const clearCart = useCartStore((s) => s.clearCart);
  const totalItems = useCartStore((s) => s.totalItems);
  const subtotalInCents = useCartStore((s) => s.subtotalInCents);

  return {
    items,
    isOpen,
    openCart,
    closeCart,
    addItem: (item: Omit<CartItem, 'quantity'>) => {
      addItem(item);
      openCart();
    },
    removeItem,
    updateQuantity,
    clearCart,
    totalItems: totalItems(),
    subtotalInCents: subtotalInCents(),
  };
}
