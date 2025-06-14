import { getCollectionProducts, shopifyFetch } from './index';
import type { Collection, ShopifyCollection } from './types';

const FEATURED_COLLECTION_HANDLE = 'featured';

export async function getFeaturedCollection(): Promise<Collection | null> {
  try {
    const query = `
      query GetFeaturedCollection {
        collection(handle: "${FEATURED_COLLECTION_HANDLE}") {
          id
          title
          handle
          description
          seo {
            title
            description
          }
          updatedAt
        }
      }
    `;

    const response = await shopifyFetch<{ data: { collection: ShopifyCollection } }>({
      query,
      headers: { 'Content-Type': 'application/json' },
    });
    const collection = response.body.data.collection;

    if (!collection) {
      return null;
    }

    const products = await getCollectionProducts({ collection: FEATURED_COLLECTION_HANDLE });

    return {
      ...collection,
      path: `/search/${collection.handle}`,
      products
    };
  } catch (error) {
    console.error('Error fetching featured collection:', error);
    return null;
  }
}
