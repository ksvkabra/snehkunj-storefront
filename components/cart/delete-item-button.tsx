'use client';

import { XMarkIcon } from '@heroicons/react/24/outline';
import { removeItem } from 'components/cart/actions';
import type { CartItem } from 'lib/shopify/types';
import { useFormStatus } from 'react-dom';

export function DeleteItemButton({
  item,
  optimisticUpdate
}: {
  item: CartItem;
  optimisticUpdate: any;
}) {
  const { pending } = useFormStatus();
  const merchandiseId = item.merchandise.id;

  return (
    <form
      action={async () => {
        optimisticUpdate(merchandiseId, 'delete');
        await removeItem(null, merchandiseId);
      }}
    >
      <button
        type="submit"
        disabled={pending}
        aria-label="Remove cart item"
        className="flex h-[24px] w-[24px] items-center justify-center rounded-full bg-neutral-500 hover:bg-neutral-700 transition-colors"
      >
        <XMarkIcon className="mx-[1px] h-4 w-4 text-white dark:text-black" />
      </button>
    </form>
  );
}
