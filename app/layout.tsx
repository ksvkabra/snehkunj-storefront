import { CartProvider } from 'components/cart/cart-context';
import Navbar from 'components/layout/navbar';
import { WelcomeToast } from 'components/welcome-toast';
import { GeistSans } from 'geist/font/sans';
import { getCart } from 'lib/shopify';
import { baseUrl } from 'lib/utils';
import { ReactNode } from 'react';
import { Toaster } from 'sonner';
import './globals.css';

const { SITE_NAME } = process.env;

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME!,
    template: `%s | ${SITE_NAME}`,
  },
  robots: {
    follow: true,
    index: true,
  },
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  console.log('🔄 Layout: Starting to fetch cart data...');
  
  // Don't await the fetch, pass the Promise to the context provider
  // Add error handling to prevent crashes when Shopify API is unavailable
  const cart = getCart().catch((error) => {
    console.error('❌ Layout: Failed to fetch cart:', error);
    console.error('❌ Layout: Cart error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      cause: error instanceof Error ? error.cause : undefined
    });
    return undefined;
  });

  console.log('✅ Layout: Cart promise created successfully');

  return (
    <html lang='en' className={GeistSans.variable}>
      <body className='bg-neutral-50 text-black selection:bg-teal-300'>
        <CartProvider cartPromise={cart}>
          <Navbar />
          <main>
            {children}
            <Toaster closeButton />
            <WelcomeToast />
          </main>
        </CartProvider>
      </body>
    </html>
  );
}
