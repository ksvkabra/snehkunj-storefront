'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useDebounce } from 'hooks/use-debounce';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useTransition } from 'react';

export default function Search() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [debouncedValue, setDebouncedValue] = useDebounce(
    searchParams?.get('q') || '',
    300
  );

  const handleSearch = useCallback(
    (term: string) => {
      const params = new URLSearchParams(searchParams);
      if (term) {
        params.set('q', term);
      } else {
        params.delete('q');
      }

      startTransition(() => {
        router.replace(`${pathname}?${params.toString()}`);
      });
    },
    [searchParams, router, pathname]
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchTerm = formData.get('q') as string;
    handleSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit} className='max-w-[550px] relative w-full lg:w-80 xl:w-full'>
      <input
        key={searchParams?.get('q')}
        type='text'
        name='q'
        placeholder='Search for products...'
        autoComplete='off'
        defaultValue={searchParams?.get('q') || ''}
        onChange={(e) => handleSearch(e.target.value)}
        className='w-full px-4 py-2 text-black bg-white border rounded-lg text-md placeholder:text-neutral-500 md:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
        disabled={isPending}
      />
      <div className='absolute top-0 right-0 flex items-center h-full mr-3'>
        <MagnifyingGlassIcon className={`h-4 ${isPending ? 'animate-spin' : ''}`} />
      </div>
    </form>
  );
}
