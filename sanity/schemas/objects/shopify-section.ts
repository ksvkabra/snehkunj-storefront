import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'shopifySection',
  title: 'Shopify Section',
  type: 'object',
  fields: [
    defineField({
      name: 'sectionType',
      title: 'Shopify Section Type',
      type: 'string',
      options: {
        list: [
          { title: 'Featured Products Carousel', value: 'featured-products-carousel' },
          { title: 'Product Grid', value: 'product-grid' },
          { title: 'Collection Showcase', value: 'collection-showcase' },
          { title: 'Recently Viewed', value: 'recently-viewed' },
          { title: 'Bestsellers', value: 'bestsellers' },
          { title: 'New Arrivals', value: 'new-arrivals' },
          { title: 'Custom Collection', value: 'custom-collection' },
          { title: 'Product Recommendations', value: 'product-recommendations' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sectionName',
      title: 'Section Name (for reference)',
      type: 'string',
      description: 'Optional name to identify this section in the studio',
    }),

    // Section Configuration
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Section Description',
      type: 'text',
      rows: 2,
    }),

    // Collection/Product Source Configuration
    defineField({
      name: 'collectionHandle',
      title: 'Collection Handle',
      type: 'string',
      description: 'Shopify collection handle (e.g., "featured-products", "summer-collection")',
      hidden: ({ parent }) => !['featured-products-carousel', 'product-grid', 'collection-showcase', 'custom-collection'].includes(parent?.sectionType || ''),
    }),
    defineField({
      name: 'productTags',
      title: 'Product Tags',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Filter products by tags (e.g., ["bestseller", "new"])',
      hidden: ({ parent }) => !['featured-products-carousel', 'product-grid'].includes(parent?.sectionType || ''),
    }),
    defineField({
      name: 'productLimit',
      title: 'Number of Products',
      type: 'number',
      description: 'Maximum number of products to display',
      initialValue: 8,
      validation: (Rule) => Rule.min(1).max(50),
    }),

    // Display Configuration
    defineField({
      name: 'displayStyle',
      title: 'Display Style',
      type: 'string',
      options: {
        list: [
          { title: 'Grid', value: 'grid' },
          { title: 'Carousel', value: 'carousel' },
          { title: 'List', value: 'list' },
          { title: 'Masonry', value: 'masonry' },
        ],
      },
      initialValue: 'grid',
      hidden: ({ parent }) => ['collection-showcase'].includes(parent?.sectionType || ''),
    }),

    // Grid Configuration
    defineField({
      name: 'gridColumns',
      title: 'Grid Columns',
      type: 'number',
      options: {
        list: [
          { title: '2 Columns', value: 2 },
          { title: '3 Columns', value: 3 },
          { title: '4 Columns', value: 4 },
          { title: '5 Columns', value: 5 },
        ],
      },
      initialValue: 4,
      hidden: ({ parent }) => parent?.displayStyle !== 'grid',
    }),

    // Carousel Configuration
    defineField({
      name: 'carouselAutoplay',
      title: 'Autoplay Carousel',
      type: 'boolean',
      initialValue: false,
      hidden: ({ parent }) => parent?.displayStyle !== 'carousel',
    }),
    defineField({
      name: 'carouselSpeed',
      title: 'Autoplay Speed (seconds)',
      type: 'number',
      initialValue: 5,
      validation: (Rule) => Rule.min(1).max(30),
      hidden: ({ parent }) => parent?.displayStyle !== 'carousel',
    }),
    defineField({
      name: 'carouselShowArrows',
      title: 'Show Navigation Arrows',
      type: 'boolean',
      initialValue: true,
      hidden: ({ parent }) => parent?.displayStyle !== 'carousel',
    }),
    defineField({
      name: 'carouselShowDots',
      title: 'Show Dot Indicators',
      type: 'boolean',
      initialValue: true,
      hidden: ({ parent }) => parent?.displayStyle !== 'carousel',
    }),

    // Product Display Options
    defineField({
      name: 'showProductImages',
      title: 'Show Product Images',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'showProductPrices',
      title: 'Show Product Prices',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'showProductTitles',
      title: 'Show Product Titles',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'showAddToCart',
      title: 'Show Add to Cart Button',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'showQuickView',
      title: 'Show Quick View Button',
      type: 'boolean',
      initialValue: false,
    }),

    // Call to Action
    defineField({
      name: 'cta',
      title: 'Call to Action',
      type: 'object',
      fields: [
        { name: 'text', title: 'Button Text', type: 'string' },
        { name: 'link', title: 'Link', type: 'string' },
        { 
          name: 'style', 
          title: 'Button Style', 
          type: 'string',
          options: {
            list: [
              { title: 'Primary', value: 'primary' },
              { title: 'Secondary', value: 'secondary' },
              { title: 'Outline', value: 'outline' },
            ],
          },
          initialValue: 'primary',
        },
      ],
    }),

    // Styling Fields
    defineField({
      name: 'headingStyle',
      title: 'Heading Style',
      type: 'string',
      options: {
        list: [
          { title: 'H1', value: 'h1' },
          { title: 'H2', value: 'h2' },
          { title: 'H3', value: 'h3' },
          { title: 'Display', value: 'display' },
          { title: 'Eyebrow', value: 'eyebrow' },
        ],
      },
    }),
    defineField({
      name: 'textAlign',
      title: 'Text Alignment',
      type: 'string',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Center', value: 'center' },
          { title: 'Right', value: 'right' },
        ],
      },
    }),
    defineField({
      name: 'textColor',
      title: 'Text Color',
      type: 'string',
      description: 'Tailwind color class (e.g., text-gray-900)',
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      description: 'Tailwind color class (e.g., bg-white)',
    }),
    defineField({
      name: 'paddingTop',
      title: 'Padding Top',
      type: 'string',
      options: {
        list: [
          { title: 'None', value: 'pt-0' },
          { title: 'Small', value: 'pt-4' },
          { title: 'Medium', value: 'pt-8' },
          { title: 'Large', value: 'pt-12' },
          { title: 'Extra Large', value: 'pt-16' },
        ],
      },
    }),
    defineField({
      name: 'paddingBottom',
      title: 'Padding Bottom',
      type: 'string',
      options: {
        list: [
          { title: 'None', value: 'pb-0' },
          { title: 'Small', value: 'pb-4' },
          { title: 'Medium', value: 'pb-8' },
          { title: 'Large', value: 'pb-12' },
          { title: 'Extra Large', value: 'pb-16' },
        ],
      },
    }),
    defineField({
      name: 'hideOnMobile',
      title: 'Hide on Mobile',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'customClassName',
      title: 'Custom CSS Classes',
      type: 'string',
      description: 'Additional Tailwind classes for custom styling',
    }),
  ],
  preview: {
    select: {
      sectionType: 'sectionType',
      sectionName: 'sectionName',
      title: 'title',
      collectionHandle: 'collectionHandle',
    },
    prepare({ sectionType, sectionName, title, collectionHandle }) {
      const displayTitle = sectionName || title || `Shopify Section (${sectionType})`;
      const subtitle = collectionHandle ? `Collection: ${collectionHandle}` : sectionType;
      
      return {
        title: displayTitle,
        subtitle: `Shopify: ${subtitle}`,
      };
    },
  },
}); 