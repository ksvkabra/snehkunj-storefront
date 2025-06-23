import { getPage } from '@sanity/lib/services/page';
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
  const [pageContent, featuredProducts] = await Promise.all([getPage('home'), getCollectionProducts({ collection: 'featured' })]);

  return (
    <>
      {/* Render Sanity sections */}
      {pageContent?.sections?.map((section, index) => (
        <SanitySection key={`${section._type}-${index}`} section={section} featuredProducts={featuredProducts} />
      ))}
      <Footer />
    </>
  );
}
