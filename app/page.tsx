import Footer from 'components/layout/footer';
import Section from 'components/section';
import { getCollectionProducts } from 'lib/shopify';
import { getPage } from 'sanity/lib/services/page';

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
      {pageContent?.sections.map((section, index) => (
        <Section key={`${section._type}-${index}`} section={section} featuredProducts={featuredProducts} />
      ))}
      <Footer />
    </>
  );
}
