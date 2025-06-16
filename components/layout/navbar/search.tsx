'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams } from 'next/navigation';

export default function Search() {
  const searchParams = useSearchParams();

  return (
    <form action='/search' className='max-w-[550px] relative w-full lg:w-80 xl:w-full'>
      <input
        key={searchParams?.get('q')}
        type='text'
        name='q'
        placeholder='Search for products...'
        autoComplete='off'
        defaultValue={searchParams?.get('q') || ''}
        className='w-full px-4 py-2 text-black bg-white border rounded-lg text-md placeholder:text-neutral-500 md:text-sm dark:border-neutral-800 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400'
      />
      <div className='absolute top-0 right-0 flex items-center h-full mr-3'>
        <MagnifyingGlassIcon className='h-4' />
      </div>
    </form>
  );
}

export function SearchSkeleton() {
  return (
    <form className='max-w-[550px] relative w-full lg:w-80 xl:w-full'>
      <input
        placeholder='Search for products...'
        className='w-full px-4 py-2 text-sm text-black bg-white border rounded-lg placeholder:text-neutral-500 dark:border-neutral-800 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400'
      />
      <div className='absolute top-0 right-0 flex items-center h-full mr-3'>
        <MagnifyingGlassIcon className='h-4' />
      </div>
    </form>
  );
}
