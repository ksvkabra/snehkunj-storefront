import { groq } from 'next-sanity';

export const pageQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    _type,
    title,
    slug,
    sections[] {
      _type,
      sectionType,
      sectionName,
      
      // Content Section fields
      title,
      subheading,
      backgroundImage,
      primaryCTA,
      secondaryCTA,
      shippingBadge,
      craftsmanshipTitle,
      craftsmanshipBody,
      craftsmanshipImage,
      craftsmanshipImagePosition,
      craftsmanshipCTA,
      testimonialsTitle,
      testimonials,
      chatTextBlock,
      highlightedInstruction,
      
      // Image Section fields
      backgroundTitle,
      backgroundSubtitle,
      backgroundOverlay,
      backgroundCTA,
      galleryTitle,
      galleryDescription,
      galleryImages,
      galleryLayout,
      galleryColumns,
      socialProofTitle,
      socialProofImages,
      socialProofLayout,
      
      // Product Section fields
      sectionTitle,
      description,
      productSourceType,
      manualProducts,
      productHandle,
      customTitle,
      customDescription,
      shopifyCollection,
      shopifyTag,
      productLimit,
      showProductImages,
      showProductPrices,
      showProductTitles,
      showAddToCart,
      carouselAutoplay,
      carouselSpeed,
      carouselShowArrows,
      carouselShowDots,
      gridColumns,
      gridGap,
      featuredLayout,
      featuredHighlight,
      cta,
      
      // Category Section fields
      categories,
      showCategoryCounts,
      showCategoryDescriptions,
      imageAspectRatio,
      navigationStyle,
      showImages,
      showCounts,
      
      // Layout Section fields
      spacerHeight,
      spacerResponsive,
      dividerStyle,
      dividerColor,
      dividerWidth,
      dividerAlignment,
      dividerText,
      containerContent,
      containerMaxWidth,
      containerPadding,
      containerCentered,
      
      // Common styling fields
      headingStyle,
      textAlign,
      textColor,
      backgroundColor,
      paddingTop,
      paddingBottom,
      hideOnMobile,
      customClassName
    },
    seo
  }
`;
