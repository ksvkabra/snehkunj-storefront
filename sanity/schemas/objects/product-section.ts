import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'productSection',
  title: 'Product Section',
  type: 'object',
  fields: [
    defineField({
      name: 'sectionType',
      title: 'Section Type',
      type: 'string',
      options: {
        list: [
          { title: 'Product Carousel', value: 'carousel' },
          { title: 'Product Grid', value: 'grid' },
          { title: 'Featured Products', value: 'featured' },
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

    // Common Product Section Fields
    defineField({
      name: 'sectionTitle',
      title: 'Section Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'productSourceType',
      title: 'Product Source',
      type: 'string',
      options: {
        list: [
          { title: 'Manual Selection', value: 'manual' },
          { title: 'Shopify Collection', value: 'collection' },
          { title: 'Shopify Tag', value: 'tag' },
          { title: 'Recently Added', value: 'recent' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    // Manual Product Selection
    defineField({
      name: 'manualProducts',
      title: 'Manual Product Selection',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'productHandle',
              title: 'Product Handle',
              type: 'string',
              description: 'Shopify product handle (e.g., "handcrafted-wooden-bowl")',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'customTitle',
              title: 'Custom Title (optional)',
              type: 'string',
              description: 'Override the product title from Shopify',
            },
            {
              name: 'customDescription',
              title: 'Custom Description (optional)',
              type: 'text',
              rows: 2,
              description: 'Override the product description from Shopify',
            },
          ],
        },
      ],
      hidden: ({ parent }) => parent?.productSourceType !== 'manual',
    }),

    // Shopify Collection/Tag Selection
    defineField({
      name: 'shopifyCollection',
      title: 'Shopify Collection Handle',
      type: 'string',
      description: 'Collection handle (e.g., "featured-products")',
      hidden: ({ parent }) => parent?.productSourceType !== 'collection',
    }),
    defineField({
      name: 'shopifyTag',
      title: 'Shopify Tag',
      type: 'string',
      description: 'Product tag (e.g., "bestseller")',
      hidden: ({ parent }) => parent?.productSourceType !== 'tag',
    }),

    // Product Display Settings
    defineField({
      name: 'productLimit',
      title: 'Number of Products',
      type: 'number',
      description: 'Maximum number of products to display',
      initialValue: 8,
      validation: (Rule) => Rule.min(1).max(50),
    }),
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

    // Carousel Specific Fields
    defineField({
      name: 'carouselAutoplay',
      title: 'Autoplay Carousel',
      type: 'boolean',
      initialValue: false,
      hidden: ({ parent }) => parent?.sectionType !== 'carousel',
    }),
    defineField({
      name: 'carouselSpeed',
      title: 'Autoplay Speed (seconds)',
      type: 'number',
      initialValue: 5,
      validation: (Rule) => Rule.min(1).max(30),
      hidden: ({ parent }) => parent?.sectionType !== 'carousel',
    }),
    defineField({
      name: 'carouselShowArrows',
      title: 'Show Navigation Arrows',
      type: 'boolean',
      initialValue: true,
      hidden: ({ parent }) => parent?.sectionType !== 'carousel',
    }),
    defineField({
      name: 'carouselShowDots',
      title: 'Show Dot Indicators',
      type: 'boolean',
      initialValue: true,
      hidden: ({ parent }) => parent?.sectionType !== 'carousel',
    }),

    // Grid Specific Fields
    defineField({
      name: 'gridColumns',
      title: 'Number of Columns',
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
      hidden: ({ parent }) => parent?.sectionType !== 'grid',
    }),
    defineField({
      name: 'gridGap',
      title: 'Grid Gap',
      type: 'string',
      options: {
        list: [
          { title: 'Small', value: 'gap-2' },
          { title: 'Medium', value: 'gap-4' },
          { title: 'Large', value: 'gap-6' },
          { title: 'Extra Large', value: 'gap-8' },
        ],
      },
      initialValue: 'gap-4',
      hidden: ({ parent }) => parent?.sectionType !== 'grid',
    }),

    // Featured Products Specific Fields
    defineField({
      name: 'featuredLayout',
      title: 'Featured Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Grid', value: 'grid' },
          { title: 'List', value: 'list' },
          { title: 'Masonry', value: 'masonry' },
        ],
      },
      initialValue: 'grid',
      hidden: ({ parent }) => parent?.sectionType !== 'featured',
    }),
    defineField({
      name: 'featuredHighlight',
      title: 'Highlight First Product',
      type: 'boolean',
      initialValue: false,
      hidden: ({ parent }) => parent?.sectionType !== 'featured',
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
      sectionTitle: 'sectionTitle',
      productSourceType: 'productSourceType',
    },
    prepare({ sectionType, sectionName, sectionTitle, productSourceType }) {
      const displayTitle = sectionName || sectionTitle || `Product Section (${sectionType})`;
      const subtitle = `${sectionType} • Source: ${productSourceType}`;
      
      return {
        title: displayTitle,
        subtitle,
      };
    },
  },
}); 