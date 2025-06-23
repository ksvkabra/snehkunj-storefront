'use client';

import type { Cart, Product, ProductVariant } from 'lib/shopify/types';
import React, { createContext, use, useContext, useMemo } from 'react';

type CartContextType = {
  cartPromise: Promise<Cart | undefined>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children, cartPromise }: { children: React.ReactNode; cartPromise: Promise<Cart | undefined> }) {
  return <CartContext.Provider value={{ cartPromise }}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }

  const cart = use(context.cartPromise);

  // Simple optimistic update for add to cart (just for UI feedback)
  const addCartItem = (variant: ProductVariant, product: Product) => {
    console.log('🛒 addCartItem called:', {
      product: product.title,
      variant: variant.title,
      variantId: variant.id,
    });
    // This is just for logging - the real cart update happens via server action
  };

  // Simple optimistic update for cart item operations (just for UI feedback)
  const updateCartItem = (merchandiseId: string, updateType: 'plus' | 'minus' | 'delete') => {
    console.log('🛒 updateCartItem called:', { merchandiseId, updateType });
    // This is just for logging - the real cart update happens via server action
  };

  return useMemo(
    () => ({
      cart,
      updateCartItem,
      addCartItem,
    }),
    [cart]
  );
}
