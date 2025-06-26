import { getPage } from '@sanity/lib/services/page';
import ApiFallback from 'components/api-fallback';
import Footer from 'components/layout/footer';
import SanitySection from 'components/sanity-section';
import { getCollectionProducts } from 'lib/shopify';

export const metadata = {
  description: 'High-performance ecommerce store built with Next.js, Vercel, and Shopify.',
  openGraph: {
    type: 'website',
  },
};

export default async function HomePage() {
  console.log('🔄 HomePage: Starting to fetch page data...');
  
  let pageContent = null;
  let featuredProducts: any[] = [];

  try {
    console.log('🔄 HomePage: Fetching page content and featured products...');
    const [pageContentResult, featuredProductsResult] = await Promise.allSettled([
      getPage('home'),
      getCollectionProducts({ collection: 'featured' })
    ]);

    console.log('📊 HomePage: Page content result status:', pageContentResult.status);
    console.log('📊 HomePage: Featured products result status:', featuredProductsResult.status);

    if (pageContentResult.status === 'fulfilled') {
      console.log('✅ HomePage: Successfully fetched page content');
      pageContent = pageContentResult.value;
      console.log('📊 HomePage: Page content data:', pageContent);
    } else {
      console.error('❌ HomePage: Failed to fetch page content:', pageContentResult.reason);
      console.error('❌ HomePage: Page content error details:', {
        message: pageContentResult.reason instanceof Error ? pageContentResult.reason.message : 'Unknown error',
        stack: pageContentResult.reason instanceof Error ? pageContentResult.reason.stack : undefined,
        cause: pageContentResult.reason instanceof Error ? pageContentResult.reason.cause : undefined
      });
    }

    if (featuredProductsResult.status === 'fulfilled') {
      console.log(`✅ HomePage: Successfully fetched ${featuredProductsResult.value.length} featured products`);
      featuredProducts = featuredProductsResult.value;
      console.log('📊 HomePage: Featured products data:', featuredProducts);
    } else {
      console.error('❌ HomePage: Failed to fetch featured products:', featuredProductsResult.reason);
      console.error('❌ HomePage: Featured products error details:', {
        message: featuredProductsResult.reason instanceof Error ? featuredProductsResult.reason.message : 'Unknown error',
        stack: featuredProductsResult.reason instanceof Error ? featuredProductsResult.reason.stack : undefined,
        cause: featuredProductsResult.reason instanceof Error ? featuredProductsResult.reason.cause : undefined
      });
    }
  } catch (error) {
    console.error('❌ HomePage: Unexpected error:', error);
    console.error('❌ HomePage: Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      cause: error instanceof Error ? error.cause : undefined
    });
  }

  console.log('🏁 HomePage: Data fetching completed');
  console.log('📊 HomePage: Final page content:', pageContent);
  console.log('📊 HomePage: Final featured products count:', featuredProducts.length);

  return (
    <>
      {/* Render Sanity sections or fallback */}
      {pageContent?.sections && pageContent.sections.length > 0 ? (
        pageContent.sections.map((section, index) => (
          <SanitySection key={`${section._type}-${index}`} section={section} featuredProducts={featuredProducts} />
        ))
      ) : (
        <ApiFallback 
          title="Welcome to HoliCraft"
          message="Our content is loading. Please check back soon or contact us if you need immediate assistance."
        />
      )}
      <Footer />
    </>
  );
}
