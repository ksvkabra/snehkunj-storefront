'use client';
import { getHeader } from '@sanity/lib/services/header';
import { debugAllDocuments, getMenuCategories } from '@sanity/lib/services/menu-category';
import type { SanityHeader } from '@sanity/lib/types/header';
import type { SanityMenuCategory } from '@sanity/lib/types/menu-category';
import CartModal from 'components/cart/modal';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Globe, Heart, Menu, Search, User, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import MegaMenu from './mega-menu';
import MobileMenu from './mobile-menu';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [menuCategories, setMenuCategories] = useState<SanityMenuCategory[]>([]);
  const [headerConfig, setHeaderConfig] = useState<SanityHeader | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();
  // Stub: replace with real auth logic
  const isLoggedIn = false;

  // Scroll animation
  const { scrollY } = useScroll();
  const headerHeight = useTransform(scrollY, [0, 100], [80, 64]);
  const headerPadding = useTransform(scrollY, [0, 100], [32, 16]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('🔄 Navbar: Starting to fetch navigation data...');
        setIsLoading(true);
        
        // Debug: Check all documents first
        console.log('🔄 Navbar: Debugging all documents...');
        await debugAllDocuments();
        console.log('✅ Navbar: Debug documents completed');
        
        // Fetch both categories and header config
        console.log('🔄 Navbar: Fetching menu categories and header config...');
        const [categories, header] = await Promise.all([
          getMenuCategories(),
          getHeader()
        ]);
        
        console.log('📊 Navbar: Categories response:', categories);
        console.log('📊 Navbar: Header response:', header);
        
        if (Array.isArray(categories) && categories.length > 0) {
          console.log(`✅ Navbar: Successfully loaded ${categories.length} menu categories`);
          setMenuCategories(categories);
        } else {
          console.warn('⚠️ Navbar: No categories found or invalid response format');
          console.log('📊 Navbar: Categories data:', categories);
        }

        if (header) {
          console.log('✅ Navbar: Successfully loaded header configuration');
          setHeaderConfig(header);
        } else {
          console.warn('⚠️ Navbar: No active header configuration found');
        }
      } catch (error) {
        console.error('❌ Navbar: Failed to fetch navigation data:', error);
        console.error('❌ Navbar: Error details:', {
          message: error instanceof Error ? error.message : 'Unknown error',
          stack: error instanceof Error ? error.stack : undefined,
          cause: error instanceof Error ? error.cause : undefined
        });
        // Set default values when API is unavailable
        setMenuCategories([]);
        setHeaderConfig(null);
      } finally {
        console.log('🏁 Navbar: Navigation data fetch completed');
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Category navigation handlers
  const getCategoryPath = (slug?: { current: string }) => {
    return slug?.current ? `/category/${slug.current}` : '#';
  };

  const handleMouseEnter = (idx: number) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenIndex(idx);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpenIndex(null);
    }, 200);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
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

  // Fallback values if no header config exists
  const logoText = headerConfig?.logo?.text || 'HOLICRAFT';
  const logoLink = headerConfig?.logo?.link || '/';
  const searchEnabled = headerConfig?.search?.enabled ?? true;
  const searchPlaceholder = headerConfig?.search?.placeholder || 'Search brands, products, or categories';
  const languageEnabled = headerConfig?.languageSelector?.enabled ?? true;
  const defaultLanguage = headerConfig?.languageSelector?.defaultLanguage || 'EN-US';
  const userAccountEnabled = headerConfig?.userAccount?.enabled ?? true;
  const showWishlist = headerConfig?.userAccount?.showWishlist ?? true;
  const backgroundColor = headerConfig?.styling?.backgroundColor || '#FFFFFF';
  const textColor = headerConfig?.styling?.textColor || '#000000';
  const hoverColor = headerConfig?.styling?.hoverColor || '#D29922';

  return (
    <motion.nav 
      className='sticky top-0 z-50 w-full border-b border-holicraft-gray-medium' 
      onKeyDown={handleKeyDown}
      style={{
        height: headerHeight,
        paddingTop: headerPadding,
        backgroundColor,
        color: textColor
      }}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Mobile/Tablet Header */}
      <div className='flex h-16 items-center px-6 gap-2 md:hidden'>
        {/* Hamburger */}
        <button
          className='flex items-center justify-center w-10 h-10 cursor-pointer'
          onClick={() => setMenuOpen(true)}
          aria-label='Open menu'
        >
          <Menu className='icon-24' style={{ color: textColor }} />
        </button>
        {/* If search is open, show search bar inline */}
        {searchOpen && searchEnabled ? (
          <form onSubmit={handleSearchSubmit} className='flex flex-1 items-center gap-2 ml-2'>
            <div className='relative w-full'>
              <input
                autoFocus
                type='text'
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder={searchPlaceholder}
                className='w-full pl-4 pr-10 py-2 rounded-full border border-holicraft-gray-medium focus:outline-none focus:ring-2 text-base font-dm-sans'
                style={{ 
                  '--tw-ring-color': hoverColor,
                  '--tw-ring-opacity': '1'
                } as React.CSSProperties}
              />
              <button
                type='button'
                className='absolute right-3 top-1/2 -translate-y-1/2'
                onClick={() => setSearchOpen(false)}
                aria-label='Close search'
              >
                <X className='icon-24 text-holicraft-gray-dark' />
              </button>
            </div>
          </form>
        ) : (
          <>
            {/* Logo left-aligned, right after hamburger */}
            <Link href={logoLink} className='text-xl font-playfair font-semibold tracking-wide ml-2' style={{ color: textColor }}>
              {logoText}
            </Link>
            {/* Spacer to push icons to right */}
            <div className='flex-1' />
            {/* Search and Cart icons */}
            {searchEnabled && (
              <button className='flex items-center justify-center w-10 h-10' onClick={() => setSearchOpen(true)} aria-label='Open search'>
                <Search className='icon-24 transition-colors' style={{ color: textColor }} />
              </button>
            )}
            <CartModal />
          </>
        )}
      </div>

      {/* Desktop Header Row 1 */}
      <div className='hidden md:flex items-center justify-between px-16'>
        {/* Left: Logo */}
        <Link href={logoLink} className='text-2xl font-playfair font-semibold tracking-wide' style={{ color: textColor }}>
          {logoText}
        </Link>
        {/* Center: Search Input */}
        {searchEnabled && (
          <form className='flex-1 flex justify-center px-8' onSubmit={handleSearchSubmit}>
            <div className='relative w-full max-w-lg'>
              <input
                type='text'
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder={searchPlaceholder}
                className='w-full pl-12 pr-4 py-2 rounded-full border border-holicraft-gray-medium focus:outline-none focus:ring-2 text-base font-dm-sans'
                style={{ 
                  '--tw-ring-color': hoverColor,
                  '--tw-ring-opacity': '1'
                } as React.CSSProperties}
              />
              <button type='submit' className='absolute left-4 top-1/2 -translate-y-1/2'>
                <Search className='icon-24 text-holicraft-gray-dark' />
              </button>
            </div>
          </form>
        )}
        {/* Right: Links/Icons */}
        <div className='flex items-center gap-4'>
          {/* Language Selector */}
          {languageEnabled && (
            <button className='flex items-center gap-1 transition-colors' style={{ color: textColor }}>
              <Globe className='icon-24' />
              <span className='text-sm font-dm-sans font-medium'>{defaultLanguage}</span>
              <ChevronDown className='w-4 h-4' />
            </button>
          )}
          {showWishlist && (
            <button className='flex items-center justify-center w-10 h-10'>
              <Heart className='icon-24 transition-colors' style={{ color: textColor }} />
            </button>
          )}
          <CartModal />
          {userAccountEnabled && (
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
              <User className='icon-24 transition-colors' style={{ color: textColor }} />
            </button>
          )}
        </div>
      </div>

      {/* Desktop Category Navigation */}
      {!isLoading && menuCategories.length > 0 && (
        <div
          className='hidden md:block relative z-40'
          style={{ backgroundColor }}
          onMouseLeave={handleMouseLeave}
          onMouseEnter={() => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
          }}
        >
          <nav className='flex justify-center border-t border-b border-holicraft-gray-medium'>
            <ul className='flex gap-6 text-sm px-16 py-2 mx-auto'>
              {menuCategories?.map((cat, idx) => (
                <li
                  key={cat._id}
                  className='relative'
                  onMouseEnter={() => handleMouseEnter(idx)}
                  onFocus={() => handleMouseEnter(idx)}
                  tabIndex={0}
                >
                  <Link
                    href={getCategoryPath(cat.slug)}
                    className='px-1 py-1 hover:border-b-2 transition-colors whitespace-nowrap font-dm-sans font-medium'
                    style={{ 
                      color: textColor,
                      borderColor: hoverColor
                    }}
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* MegaMenu */}
          <MegaMenu
            isOpen={openIndex !== null}
            categories={menuCategories}
            activeIndex={openIndex}
            onClose={() => setOpenIndex(null)}
            onCategoryHover={handleMouseEnter}
          />
        </div>
      )}

      {/* Mobile Menu */}
      {!isLoading && menuCategories.length > 0 && (
        <Suspense fallback={null}>
          <MobileMenu open={menuOpen} setOpen={setMenuOpen} menu={menuCategories} />
        </Suspense>
      )}
    </motion.nav>
  );
}
