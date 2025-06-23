import { defaultSort, sorting } from 'lib/constants';
import { getProducts } from 'lib/shopify';
import Image from 'next/image';
import Link from 'next/link';

interface SearchResultsProps {
  query: string;
  category?: string;
  sort: string;
  page: number;
}

export async function SearchResults({ query, category, sort, page }: SearchResultsProps) {
  // Get sort parameters
  const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;
  
  // Get products from Shopify (limited to 100 as per the query)
  const products = await getProducts({ 
    sortKey, 
    reverse, 
    query: query || undefined
  });

  const formatPrice = (amount: string, currencyCode: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
    }).format(parseFloat(amount));
  };

  if (!query) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Search Products</h2>
        <p className="text-gray-600">Enter a search term to find products</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">No results found</h2>
        <p className="text-gray-600">
          No products found for &quot;{query}&quot;
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Results Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Search Results
          </h1>
          <p className="text-gray-600">
            {products.length} result{products.length !== 1 ? 's' : ''} for &quot;{query}&quot;
          </p>
        </div>
        
        {/* Sort Options */}
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700">Sort by:</label>
          <select 
            defaultValue={sort}
            className="text-sm border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {sorting.map((item) => (
              <option key={item.slug ?? ''} value={item.slug ?? ''}>
                {item.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link
            key={product.handle}
            href={`/product/${product.handle}`}
            className="group block"
          >
            <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-100">
              {product.featuredImage && (
                <Image
                  src={product.featuredImage.url}
                  alt={product.featuredImage.altText || product.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
              )}
            </div>
            <div className="mt-4 space-y-1">
              <h3 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 line-clamp-2">
                {product.title}
              </h3>
              <p className="text-sm text-gray-600">
                {formatPrice(product.priceRange.minVariantPrice.amount, product.priceRange.minVariantPrice.currencyCode)}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Note: Pagination removed as Shopify query is limited to 100 products */}
      {products.length >= 100 && (
        <div className="text-center py-4">
          <p className="text-sm text-gray-600">
            Showing first 100 results. Use filters to narrow your search.
          </p>
        </div>
      )}
    </div>
  );
} 