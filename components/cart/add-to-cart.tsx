'use client';

import { PlusIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { useProduct } from 'components/product/product-context';
import { Product, ProductVariant } from 'lib/shopify/types';
import { useFormStatus } from 'react-dom';
import { addItem } from './actions';

function SubmitButton({ availableForSale, selectedVariantId }: { availableForSale: boolean; selectedVariantId: string | undefined }) {
  const { pending } = useFormStatus();
  const buttonClasses =
    'relative flex w-full items-center justify-center rounded-full bg-blue-600 p-4 tracking-wide text-white cursor-pointer';
  const disabledClasses = 'cursor-not-allowed opacity-60 hover:opacity-60';

  if (!availableForSale) {
    return (
      <button disabled className={clsx(buttonClasses, disabledClasses)}>
        Out Of Stock
      </button>
    );
  }

  if (!selectedVariantId) {
    return (
      <button aria-label='Please select an option' disabled className={clsx(buttonClasses, disabledClasses)}>
        Add To Cart
      </button>
    );
  }

  return (
    <button
      aria-label='Add to cart'
      disabled={pending}
      className={clsx(buttonClasses, {
        'hover:opacity-90': true,
        'opacity-50': pending,
      })}
    >
      <div className='absolute left-0 ml-4'>
        {pending ? <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white'></div> : <PlusIcon className='h-5' />}
      </div>
      {pending ? 'Adding...' : 'Add To Cart'}
    </button>
  );
}

export function AddToCart({ product }: { product: Product }) {
  const { variants, availableForSale } = product;
  const { state } = useProduct();

  const variant = variants.find((variant: ProductVariant) =>
    variant.selectedOptions.every((option) => option.value === state[option.name.toLowerCase()])
  );
  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;
  const selectedVariantId = variant?.id || defaultVariantId;
  const finalVariant = variants.find((variant) => variant.id === selectedVariantId)!;

  return (
    <form
      action={async () => {
        if (finalVariant && selectedVariantId) {
          // Only add to cart via server action
          try {
            await addItem(null, selectedVariantId);
          } catch (error) {
            console.error('❌ Failed to add item to cart:', error);
          }
        } else {
          console.warn('⚠️ Cannot add to cart: missing variant or variant ID');
        }
      }}
    >
      <SubmitButton availableForSale={availableForSale} selectedVariantId={selectedVariantId} />
    </form>
  );
}
