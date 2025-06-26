'use client';

import { Product } from '../lib/shopify/types';
import type { SanitySection } from '../sanity/lib/types/page';
import ChatPromptSection from './sections/chat-prompt-section';
import CraftsmanshipSection from './sections/craftsmanship-section';
import FeaturedCategoriesSection from './sections/featured-categories-section';
import HeroSection from './sections/hero-section';
import ImageTextBannerSection from './sections/image-text-banner-section';
import ProductCarouselSection from './sections/product-carousel-section';
import ShopifySection from './sections/shopify-section';
import SocialProofSection from './sections/social-proof-section';
import TestimonialsSection from './sections/testimonials-section';

interface SanitySectionProps {
  section: SanitySection;
  featuredProducts: Product[];
}

export default function SanitySection({ section, featuredProducts }: SanitySectionProps) {
  // Handle content sections (hero, testimonials, etc.)
  if (section._type === 'contentSection') {
    const contentSection = section as any;
    switch (contentSection.sectionType) {
      case 'hero':
        return (
          <HeroSection
            title={contentSection.title}
            subtitle={contentSection.subheading}
            description={contentSection.description}
            image={contentSection.image}
            imagePosition={contentSection.imagePosition}
            primaryCta={contentSection.primaryCta}
            secondaryCta={contentSection.secondaryCta}
            shippingBadge={contentSection.shippingBadge}
          />
        );
      case 'craftsmanship':
        return <CraftsmanshipSection data={contentSection} />;
      case 'testimonials':
        return <TestimonialsSection data={contentSection} />;
      case 'chat':
        return <ChatPromptSection data={contentSection} />;
      default:
        console.warn(`Unknown content section type: ${contentSection.sectionType}`);
        return null;
    }
  }

  // Handle image sections
  if (section._type === 'imageSection') {
    const imageSection = section as any;
    switch (imageSection.sectionType) {
      case 'background':
        return (
          <ImageTextBannerSection
            data={{
              _type: 'imageSection',
              sectionType: 'image-text-banner',
              headline: imageSection.backgroundTitle || '',
              text: imageSection.backgroundSubtitle || '',
              image: imageSection.backgroundImage,
              ctaLabel: imageSection.backgroundCTA?.text,
              ctaLink: imageSection.backgroundCTA?.link,
            }}
          />
        );
      case 'image-text-banner':
        return <ImageTextBannerSection data={imageSection} />;
      case 'social-proof':
        return <SocialProofSection data={imageSection} />;
      default:
        console.warn(`Unknown image section type: ${imageSection.sectionType}`);
        return null;
    }
  }

  // Handle product sections
  if (section._type === 'productSection') {
    const productSection = section as any;
    switch (productSection.sectionType) {
      case 'carousel':
        return <ProductCarouselSection data={productSection} featuredProducts={featuredProducts} />;
      case 'grid':
      case 'featured':
        return <FeaturedCategoriesSection data={productSection} />;
      default:
        console.warn(`Unknown product section type: ${productSection.sectionType}`);
        return null;
    }
  }

  // Handle category sections
  if (section._type === 'categorySection') {
    const categorySection = section as any;
    if (categorySection.sectionType === 'featured-grid') {
      return <FeaturedCategoriesSection data={categorySection} />;
    } else if (categorySection.sectionType === 'navigation') {
      // For now, use the same component but we could create a dedicated navigation component later
      return <FeaturedCategoriesSection data={categorySection} />;
    } else {
      console.warn(`Unknown category section type: ${categorySection.sectionType}`);
      return null;
    }
  }

  // Handle layout sections
  if (section._type === 'layoutSection') {
    const layoutSection = section as any;
    switch (layoutSection.sectionType) {
      case 'spacer':
        return (
          <div className={`${layoutSection.spacerHeight || 'h-8'}`} />
        );
      case 'divider':
        return (
          <div className={`${layoutSection.paddingTop || 'pt-8'} ${layoutSection.paddingBottom || 'pb-8'}`}>
            <div className={`${layoutSection.dividerWidth || 'border-t'} ${layoutSection.dividerColor || 'border-gray-200'} ${layoutSection.dividerAlignment === 'center' ? 'mx-auto' : ''}`}>
              {layoutSection.dividerText && (
                <span className="px-4 text-sm text-gray-500">{layoutSection.dividerText}</span>
              )}
            </div>
          </div>
        );
      case 'container':
        return (
          <div className={`${layoutSection.paddingTop || 'pt-8'} ${layoutSection.paddingBottom || 'pb-8'} ${layoutSection.backgroundColor || ''}`}>
            <div className={`${layoutSection.containerMaxWidth || 'max-w-7xl'} ${layoutSection.containerPadding || 'px-4'} ${layoutSection.containerCentered ? 'mx-auto' : ''}`}>
              {layoutSection.containerContent?.map((item: any, index: number) => (
                <div key={index}>
                  {/* Render container content - this would need to be handled based on content type */}
                  {typeof item === 'string' ? item : JSON.stringify(item)}
                </div>
              ))}
            </div>
          </div>
        );
      default:
        console.warn(`Unknown layout section type: ${layoutSection.sectionType}`);
        return null;
    }
  }

  // Handle Shopify sections
  if (section._type === 'shopifySection') {
    return <ShopifySection data={section} featuredProducts={featuredProducts} />;
  }

  // If we get here, the section type is not recognized
  const sectionAny = section as any;
  console.warn(`Unknown section type: ${sectionAny._type}`);
  return null;
} 