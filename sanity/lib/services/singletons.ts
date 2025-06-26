import { sanityAdminClient } from '../admin-client';
import { sanityClient } from '../client';

/**
 * Service for handling singleton documents in Sanity
 * These documents should only have one instance
 */

export async function getSingleton<T>(
  documentType: string,
  query: string
): Promise<T | null> {
  try {
    const result = await sanityClient.fetch<T>(query);
    return result;
  } catch (error) {
    console.error(`Error fetching ${documentType} singleton:`, error);
    return null;
  }
}

export async function getHeader() {
  const query = `*[_type == "header"] | order(_createdAt desc)[0] {
    _id,
    title,
    logo {
      text,
      image,
      link
    },
    search {
      enabled,
      placeholder
    },
    languageSelector {
      enabled,
      defaultLanguage,
      availableLanguages
    },
    userAccount {
      enabled,
      showWishlist
    },
    styling {
      backgroundColor,
      textColor,
      hoverColor
    },
    isActive
  }`;

  return getSingleton('header', query);
}

export async function getHomePage() {
  const query = `*[_type == "homePage"] | order(_createdAt desc)[0] {
    _id,
    title,
    slug,
    sections[] {
      _type,
      _key,
      sectionType,
      sectionName,
      
      // Hero Section Fields
      heroTitle,
      subheading,
      description,
      image,
      imagePosition,
      primaryCta,
      secondaryCta,
      shippingBadge,
      
      // Craftsmanship Section Fields
      craftsmanshipTitle,
      craftsmanshipBody,
      craftsmanshipImage,
      craftsmanshipImagePosition,
      craftsmanshipCTA,
      
      // Testimonials Section Fields
      testimonialsTitle,
      testimonials,
      
      // Chat Section Fields
      chatTextBlock,
      highlightedInstruction,
      
      // Category Section Fields
      title,
      categories[] {
        _key,
        label,
        description,
        image,
        link,
        productCount,
        featured
      },
      gridColumns,
      gridGap,
      showCategoryCounts,
      showCategoryDescriptions,
      imageAspectRatio,
      
      // Product Section Fields
      sectionTitle,
      productSourceType,
      shopifyCollection,
      productLimit,
      showProductImages,
      showProductPrices,
      showProductTitles,
      showAddToCart,
      
      // Image Section Fields
      altText,
      caption,
      backgroundColor,
      textColor,
      showCaption,
      
      // Social Proof Section Fields
      socialProofTitle,
      socialProofImages[] {
        _key,
        image,
        alt,
        title,
        description,
        link
      },
      
      // Layout Section Fields
      columns,
      gap,
      alignment,
      containerMaxWidth,
      containerPadding,
      containerCentered,
      containerContent,
      
      // Shopify Section Fields
      shopifyType,
      shopifyData
    },
    seo {
      title,
      description,
      ogImage
    }
  }`;

  return getSingleton('homePage', query);
}

export async function getGlobalFooter() {
  const query = `*[_type == "globalFooter"] | order(_createdAt desc)[0] {
    _id,
    title,
    isActive,
    columns[] {
      heading,
      links[] {
        label,
        url,
        external
      }
    },
    socialLinks[] {
      platform,
      customPlatform,
      url,
      icon
    },
    companyInfo {
      logo,
      tagline,
      description,
      address,
      phone,
      email
    },
    styling {
      backgroundColor,
      textColor,
      linkColor,
      hoverColor
    }
  }`;

  return getSingleton('globalFooter', query);
}

/**
 * Initialize singleton documents if they don't exist
 * This should be called during setup or migration
 */
export async function initializeSingletons() {
  const singletons: any[] = [
    {
      _type: 'header',
      title: 'Default Header',
      logo: {
        text: 'HOLICRAFT',
        link: '/'
      },
      search: {
        enabled: true,
        placeholder: 'Search brands, products, or categories'
      },
      languageSelector: {
        enabled: true,
        defaultLanguage: 'EN-US',
        availableLanguages: ['EN-US', 'FR-FR', 'DE-DE']
      },
      userAccount: {
        enabled: true,
        showWishlist: true
      },
      styling: {
        backgroundColor: '#FFFFFF',
        textColor: '#000000',
        hoverColor: '#D29922'
      },
      isActive: true
    },
    {
      _type: 'homePage',
      title: 'Homepage',
      slug: {
        current: 'home'
      },
      sections: [
        {
          _type: 'contentSection',
          _key: 'welcome',
          sectionType: 'content',
          title: 'Welcome to HoliCraft',
          content: [
            {
              _type: 'block',
              children: [
                {
                  _type: 'span',
                  text: 'Discover our handcrafted products made with love and tradition.'
                }
              ]
            }
          ],
          alignment: 'center',
          backgroundColor: '#F8F0E6',
          textColor: '#333333'
        }
      ],
      seo: {
        title: 'HoliCraft - Handcrafted Products',
        description: 'Discover our collection of handcrafted products made with love and tradition.'
      }
    },
    {
      _type: 'globalFooter',
      title: 'Default Footer',
      isActive: true,
      columns: [
        {
          heading: 'About Us',
          links: [
            { label: 'Our Story', url: '/about', external: false },
            { label: 'Contact', url: '/contact', external: false }
          ]
        },
        {
          heading: 'Customer Service',
          links: [
            { label: 'Shipping', url: '/shipping', external: false },
            { label: 'Returns', url: '/returns', external: false }
          ]
        }
      ],
      socialLinks: [],
      companyInfo: {
        tagline: 'Handcrafted with Love',
        description: 'We create beautiful handcrafted products that bring joy to your home.',
        address: '123 Craft Street, Artisan City, AC 12345',
        phone: '+1 (555) 123-4567',
        email: 'hello@holicraft.com'
      },
      styling: {
        backgroundColor: '#333333',
        textColor: '#FFFFFF',
        linkColor: '#D29922',
        hoverColor: '#F8F0E6'
      }
    }
  ];

  for (const singleton of singletons) {
    try {
      const existing = await sanityClient.fetch(
        `*[_type == $type][0]`,
        { type: singleton._type }
      );

      if (!existing) {
        await sanityAdminClient.create(singleton);
        console.log(`Created ${singleton._type} singleton`);
      } else {
        console.log(`${singleton._type} singleton already exists`);
      }
    } catch (error) {
      console.error(`Error initializing ${singleton._type} singleton:`, error);
    }
  }
} 