'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export function SearchFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const updateFilters = useCallback((updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams);
    
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    // Reset to page 1 when filters change
    params.delete('page');
    
    router.push(`${pathname}?${params.toString()}`);
  }, [searchParams, router, pathname]);

  const currentCategory = searchParams.get('category');
  const currentPriceRange = searchParams.get('price');

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-medium text-gray-900">Filters</h2>
      
      {/* Category Filter */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-700">Category</h3>
        <div className="space-y-2">
          {[
            { value: 'all', label: 'All Categories' },
            { value: 'clothing', label: 'Clothing' },
            { value: 'accessories', label: 'Accessories' },
            { value: 'home', label: 'Home & Garden' },
            { value: 'electronics', label: 'Electronics' },
          ].map((category) => (
            <label key={category.value} className="flex items-center">
              <input
                type="radio"
                name="category"
                value={category.value}
                checked={currentCategory === category.value || (!currentCategory && category.value === 'all')}
                onChange={(e) => updateFilters({ category: e.target.value === 'all' ? null : e.target.value })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">{category.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-700">Price Range</h3>
        <div className="space-y-2">
          {[
            { value: 'all', label: 'All Prices' },
            { value: '0-25', label: 'Under $25' },
            { value: '25-50', label: '$25 - $50' },
            { value: '50-100', label: '$50 - $100' },
            { value: '100+', label: 'Over $100' },
          ].map((range) => (
            <label key={range.value} className="flex items-center">
              <input
                type="radio"
                name="price"
                value={range.value}
                checked={currentPriceRange === range.value || (!currentPriceRange && range.value === 'all')}
                onChange={(e) => updateFilters({ price: e.target.value === 'all' ? null : e.target.value })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">{range.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Availability Filter */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-700">Availability</h3>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">In Stock Only</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">On Sale</span>
          </label>
        </div>
      </div>

      {/* Clear Filters */}
      {(currentCategory || currentPriceRange) && (
        <button
          onClick={() => updateFilters({ category: null, price: null })}
          className="w-full text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          Clear All Filters
        </button>
      )}
    </div>
  );
} 