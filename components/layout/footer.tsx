import { getGlobalFooter } from '../../sanity/lib/services/singletons';
import FooterClient from './footer-client';

// Type for the footer data returned from getGlobalFooter
interface FooterData {
  _id: string;
  title: string;
  isActive: boolean;
  columns: Array<{
    heading: string;
    links: Array<{
      label: string;
      url: string;
      external: boolean;
    }>;
  }>;
  socialLinks: Array<{
    platform: string;
    customPlatform?: string;
    url: string;
    icon?: any;
  }>;
  companyInfo?: {
    logo?: any;
    tagline?: string;
    description?: string;
    address?: string;
    phone?: string;
    email?: string;
  };
  styling?: {
    backgroundColor?: string;
    textColor?: string;
    linkColor?: string;
    hoverColor?: string;
  };
}

export default async function Footer() {
  console.log('🔄 Footer: Starting to fetch footer data...');
  
  try {
    const footer = await getGlobalFooter() as FooterData | null;
    console.log('📊 Footer: Footer data response:', footer);
    
    if (footer) {
      console.log('✅ Footer: Successfully loaded footer data');
    } else {
      console.warn('⚠️ Footer: No footer data found, using fallback');
    }

    if (!footer) {
      console.log('🏁 Footer: Rendering fallback footer');
      return <FooterClient footer={null} />;
    }

    console.log('🏁 Footer: Rendering footer with data');
    return <FooterClient footer={footer} />;
  } catch (error) {
    console.error('❌ Footer: Failed to fetch footer data:', error);
    console.error('❌ Footer: Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      cause: error instanceof Error ? error.cause : undefined
    });
    console.log('🏁 Footer: Rendering fallback footer due to error');
    return <FooterClient footer={null} />;
  }
}
