import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white dark:border-neutral-800 dark:bg-black">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          <Link href="/" className="text-gray-400 hover:text-gray-500">
            <span className="sr-only">HoliCraft</span>
            <div className="h-6 w-6">🎨</div>
          </Link>
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          <p className="text-center text-xs leading-5 text-gray-500">
            &copy; 2024 HoliCraft. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
