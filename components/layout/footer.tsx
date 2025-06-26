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
  const footer = await getGlobalFooter() as FooterData | null;

  if (!footer) {
    return <FooterClient footer={null} />;
  }

  return <FooterClient footer={footer} />;
}
