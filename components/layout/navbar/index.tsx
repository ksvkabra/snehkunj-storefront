'use client';
import { ChevronDown, Globe, Heart, Menu, Search, ShoppingCart, User, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Suspense, useCallback, useEffect, useState } from 'react';
import { debugAllDocuments, getMenuCategories } from 'sanity/lib/services/menu-category';
import type { SanityMenuCategory } from 'sanity/lib/types/menu-category';
import DesktopCategoryNav from './desktop-category-nav';
import MobileMenu from './mobile-menu';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [menuCategories, setMenuCategories] = useState<SanityMenuCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  // Stub: replace with real auth logic
  const isLoggedIn = false;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        // Debug: Check all documents first
        await debugAllDocuments();
        
        const categories = await getMenuCategories();
        console.log('🚀 ~ fetchCategories ~ categories:', categories);
        
        if (Array.isArray(categories) && categories.length > 0) {
          setMenuCategories(categories);
        } else {
          console.warn('No categories found or invalid response format');
        }
      } catch (error) {
        console.error('Failed to fetch menu categories:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Keyboard shortcut: ESC closes menu or search
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (menuOpen) setMenuOpen(false);
        if (searchOpen) setSearchOpen(false);
      }
    },
    [menuOpen, searchOpen]
  );

  // Handle search submit
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchValue.trim())}`);
      setSearchOpen(false);
    }
  };

  return (
    <nav className='sticky top-0 z-50 w-full bg-white border-b' onKeyDown={handleKeyDown}>
      {/* Mobile/Tablet Header */}
      <div className='flex h-14 items-center px-4 gap-2 md:hidden'>
        {/* Hamburger */}
        <button
          className='flex items-center justify-center w-10 h-10 cursor-pointer'
          onClick={() => setMenuOpen(true)}
          aria-label='Open menu'
        >
          <Menu className='h-6 w-6 text-gray-900' />
        </button>
        {/* If search is open, show search bar inline */}
        {searchOpen ? (
          <form onSubmit={handleSearchSubmit} className='flex flex-1 items-center gap-2 ml-2'>
            <div className='relative w-full'>
              <input
                autoFocus
                type='text'
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder='Search brands, products, or categories'
                className='w-full pl-4 pr-10 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900 text-base'
              />
              <button
                type='button'
                className='absolute right-3 top-1/2 -translate-y-1/2'
                onClick={() => setSearchOpen(false)}
                aria-label='Close search'
              >
                <X className='h-5 w-5 text-gray-500' />
              </button>
            </div>
          </form>
        ) : (
          <>
            {/* Logo left-aligned, right after hamburger */}
            <Link href='/' className='text-xl font-bold tracking-wide text-gray-900 ml-2'>
              FAIRE
            </Link>
            {/* Spacer to push icons to right */}
            <div className='flex-1' />
            {/* Search and Cart icons */}
            <button className='flex items-center justify-center w-10 h-10' onClick={() => setSearchOpen(true)} aria-label='Open search'>
              <Search className='h-6 w-6 text-gray-900' />
            </button>
            <Link href='/cart' className='flex items-center justify-center w-10 h-10' aria-label='Cart'>
              <ShoppingCart className='h-6 w-6 text-gray-900' />
            </Link>
          </>
        )}
      </div>

      {/* Desktop Header Row 1 */}
      <div className='hidden md:flex h-16 items-center justify-between px-6'>
        {/* Left: Logo */}
        <Link href='/' className='text-2xl font-bold tracking-wide text-gray-900'>
          FAIRE
        </Link>
        {/* Center: Search Input */}
        <form className='flex-1 flex justify-center px-8' onSubmit={handleSearchSubmit}>
          <div className='relative w-full max-w-lg'>
            <input
              type='text'
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder='Search brands, products, or categories'
              className='w-full pl-12 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900 text-base'
            />
            <button type='submit' className='absolute left-4 top-1/2 -translate-y-1/2'>
              <Search className='h-5 w-5 text-gray-400' />
            </button>
          </div>
        </form>
        {/* Right: Links/Icons */}
        <div className='flex items-center gap-4'>
          {/* Language Selector */}
          <button className='flex items-center gap-1 text-gray-700 hover:text-gray-900'>
            <Globe className='h-5 w-5' />
            <span className='text-sm font-medium'>EN-US</span>
            <ChevronDown className='h-4 w-4' />
          </button>
          <button className='flex items-center justify-center w-10 h-10'>
            <Heart className='h-5 w-5 text-gray-700 hover:text-gray-900' />
          </button>
          <Link href='/cart' className='flex items-center justify-center w-10 h-10' aria-label='Cart'>
            <ShoppingCart className='h-5 w-5 text-gray-700 hover:text-gray-900' />
          </Link>
          <button
            className='flex items-center justify-center w-10 h-10'
            onClick={() => {
              if (isLoggedIn) {
                window.location.href = '/account';
              } else {
                window.location.href = '/login';
              }
            }}
            aria-label='User account'
          >
            <User className='h-5 w-5 text-gray-700 hover:text-gray-900' />
          </button>
        </div>
      </div>

      {!isLoading && menuCategories.length > 0 && (
        <>
          <DesktopCategoryNav categories={menuCategories} />
          <Suspense fallback={null}>
            <MobileMenu open={menuOpen} setOpen={setMenuOpen} menu={menuCategories} />
          </Suspense>
        </>
      )}
    </nav>
  );
}
