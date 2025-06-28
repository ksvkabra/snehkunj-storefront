import type { SanityProductSection } from '@sanity/lib/types/product-section';
import type { Product } from 'lib/shopify/types';
import { useEffect, useState } from 'react';

interface UseProductCarouselProps {
  data: SanityProductSection;
  featuredProducts: Product[];
}

export function useProductCarousel({ data, featuredProducts }: UseProductCarouselProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        let fetchedProducts: Product[] = [];

        switch (data.productSourceType) {
          case 'manual':
            // For manual products, we need to fetch by handles
            if (data.manualProducts?.length) {
              const handles = data.manualProducts.map(item => item.productHandle);
              // This would need to be implemented with actual Shopify API calls
              // For now, we'll filter from featured products
              fetchedProducts = featuredProducts.filter(product => 
                handles.includes(product.handle)
              );
            }
            break;

          case 'collection':
            // Fetch products from a specific collection
            if (data.shopifyCollection) {
              // This would need to be implemented with actual Shopify API calls
              // For now, we'll use featured products as a fallback
              fetchedProducts = featuredProducts;
            }
            break;

          case 'tag':
            // Fetch products by tag
            if (data.shopifyTag) {
              // This would need to be implemented with actual Shopify API calls
              // For now, we'll use featured products as a fallback
              fetchedProducts = featuredProducts;
            }
            break;

          case 'recent':
            // Fetch recently added products
            // This would need to be implemented with actual Shopify API calls
            // For now, we'll use featured products as a fallback
            fetchedProducts = featuredProducts;
            break;

          default:
            fetchedProducts = featuredProducts;
        }

        // Apply product limit
        if (data.productLimit && fetchedProducts.length > data.productLimit) {
          fetchedProducts = fetchedProducts.slice(0, data.productLimit);
        }

        setProducts(fetchedProducts);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch products');
        // Fallback to featured products
        setProducts(featuredProducts.slice(0, data.productLimit || 8));
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [data, featuredProducts]);

  return { products, loading, error };
} 