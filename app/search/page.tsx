import { SearchFilters } from 'components/search/search-filters';
import { SearchResults } from 'components/search/search-results';
import { Suspense } from 'react';

interface SearchPageProps {
  searchParams: Promise<{ q?: string; category?: string; sort?: string; page?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = params.q || '';
  const category = params.category;
  const sort = params.sort || 'relevance';
  const page = parseInt(params.page || '1');

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-64 flex-shrink-0">
          <Suspense fallback={<div className="space-y-4">
            <div className="h-6 bg-gray-200 animate-pulse rounded" />
            <div className="h-4 bg-gray-200 animate-pulse rounded" />
            <div className="h-4 bg-gray-200 animate-pulse rounded" />
          </div>}>
            <SearchFilters />
          </Suspense>
        </div>

        {/* Search Results */}
        <div className="flex-1">
          <Suspense fallback={<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="aspect-square bg-gray-200 animate-pulse rounded-lg" />
            ))}
          </div>}>
            <SearchResults 
              query={query}
              category={category}
              sort={sort}
              page={page}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
