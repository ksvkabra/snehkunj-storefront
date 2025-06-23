'use server';

import { TAGS } from 'lib/constants';
import {
  addToCart,
  createCart,
  getCart,
  removeFromCart,
  updateCart
} from 'lib/shopify';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function addItem(
  prevState: any,
  selectedVariantId: string | undefined
) {
  console.log('🛒 Server action: addItem called with variantId:', selectedVariantId);
  
  if (!selectedVariantId) {
    console.error('❌ Server action: No variant ID provided');
    return 'Error adding item to cart';
  }

  try {
    let cart = await getCart();
    console.log('🛒 Server action: Current cart:', cart ? 'exists' : 'not found');
    
    // Create cart if it doesn't exist
    if (!cart) {
      console.log('🛒 Server action: Creating new cart');
      cart = await createCart();
      (await cookies()).set('cartId', cart.id!);
      console.log('🛒 Server action: New cart created with ID:', cart.id);
    }

    console.log('🛒 Server action: Adding item to cart');
    await addToCart([{ merchandiseId: selectedVariantId, quantity: 1 }]);
    revalidateTag(TAGS.cart);
    console.log('✅ Server action: Item added successfully');
  } catch (e) {
    console.error('❌ Server action: Error adding item to cart:', e);
    return 'Error adding item to cart';
  }
}

export async function removeItem(prevState: any, merchandiseId: string) {
  try {
    const cart = await getCart();

    if (!cart) {
      return 'Error fetching cart';
    }

    const lineItem = cart.lines.find(
      (line) => line.merchandise.id === merchandiseId
    );

    if (lineItem && lineItem.id) {
      await removeFromCart([lineItem.id]);
      revalidateTag(TAGS.cart);
    } else {
      return 'Item not found in cart';
    }
  } catch (e) {
    return 'Error removing item from cart';
  }
}

export async function updateItemQuantity(
  prevState: any,
  payload: {
    merchandiseId: string;
    quantity: number;
  }
) {
  const { merchandiseId, quantity } = payload;

  try {
    const cart = await getCart();

    if (!cart) {
      return 'Error fetching cart';
    }

    const lineItem = cart.lines.find(
      (line) => line.merchandise.id === merchandiseId
    );

    if (lineItem && lineItem.id) {
      if (quantity === 0) {
        await removeFromCart([lineItem.id]);
      } else {
        await updateCart([
          {
            id: lineItem.id,
            merchandiseId,
            quantity
          }
        ]);
      }
    } else if (quantity > 0) {
      // If the item doesn't exist in the cart and quantity > 0, add it
      await addToCart([{ merchandiseId, quantity }]);
    }

    revalidateTag(TAGS.cart);
  } catch (e) {
    console.error(e);
    return 'Error updating item quantity';
  }
}

export async function createCartAndSetCookie() {
  let cart = await createCart();
  (await cookies()).set('cartId', cart.id!);
}

export async function redirectToCheckout(_formData: FormData) {
  const cart = await getCart();

  if (!cart) {
    throw new Error('Something went wrong');
  }

  const checkoutUrl = cart.checkoutUrl;

  if (!checkoutUrl) {
    throw new Error('Missing checkout URL');
  }

  redirect(checkoutUrl);
}
