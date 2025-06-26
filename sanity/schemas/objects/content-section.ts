import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'contentSection',
  title: 'Content Section',
  type: 'object',
  fields: [
    defineField({
      name: 'sectionType',
      title: 'Section Type',
      type: 'string',
      options: {
        list: [
          { title: 'Hero Section', value: 'hero' },
          { title: 'Craftsmanship Story', value: 'craftsmanship' },
          { title: 'Testimonials', value: 'testimonials' },
          { title: 'Chat Prompt', value: 'chat' },
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

    // Hero Section Fields
    defineField({
      name: 'heroTitle',
      title: 'Title',
      type: 'string',
      hidden: ({ parent }) => parent?.sectionType !== 'hero',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if ((context?.parent as any)?.sectionType === 'hero' && !value) {
            return 'Title is required for Hero section';
          }
          return true;
        }),
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'text',
      rows: 2,
      hidden: ({ parent }) => parent?.sectionType !== 'hero',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      hidden: ({ parent }) => parent?.sectionType !== 'hero',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Important for accessibility',
        },
      ],
      hidden: ({ parent }) => parent?.sectionType !== 'hero',
    }),
    defineField({
      name: 'imagePosition',
      title: 'Image Position',
      type: 'string',
      options: {
        list: [
          { title: 'Right', value: 'right' },
          { title: 'Left', value: 'left' },
        ],
      },
      initialValue: 'right',
      hidden: ({ parent }) => parent?.sectionType !== 'hero',
    }),
    defineField({
      name: 'primaryCta',
      title: 'Primary Call to Action',
      type: 'object',
      fields: [
        { name: 'text', title: 'Button Text', type: 'string' },
        { name: 'link', title: 'Link', type: 'string' },
      ],
      hidden: ({ parent }) => parent?.sectionType !== 'hero',
    }),
    defineField({
      name: 'secondaryCta',
      title: 'Secondary Call to Action',
      type: 'object',
      fields: [
        { name: 'text', title: 'Button Text', type: 'string' },
        { name: 'link', title: 'Link', type: 'string' },
      ],
      hidden: ({ parent }) => parent?.sectionType !== 'hero',
    }),
    defineField({
      name: 'shippingBadge',
      title: 'Shipping Badge Text',
      type: 'string',
      initialValue: 'Free Shipping Worldwide',
      hidden: ({ parent }) => parent?.sectionType !== 'hero',
    }),

    // Craftsmanship Story Fields
    defineField({
      name: 'craftsmanshipTitle',
      title: 'Title',
      type: 'string',
      hidden: ({ parent }) => parent?.sectionType !== 'craftsmanship',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if ((context?.parent as any)?.sectionType === 'craftsmanship' && !value) {
            return 'Title is required for Craftsmanship section';
          }
          return true;
        }),
    }),
    defineField({
      name: 'craftsmanshipBody',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }],
      hidden: ({ parent }) => parent?.sectionType !== 'craftsmanship',
    }),
    defineField({
      name: 'craftsmanshipImage',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      hidden: ({ parent }) => parent?.sectionType !== 'craftsmanship',
    }),
    defineField({
      name: 'craftsmanshipImagePosition',
      title: 'Image Position',
      type: 'string',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Right', value: 'right' },
        ],
        layout: 'radio',
      },
      initialValue: 'right',
      hidden: ({ parent }) => parent?.sectionType !== 'craftsmanship',
    }),
    defineField({
      name: 'craftsmanshipCTA',
      title: 'Call to Action',
      type: 'object',
      fields: [
        { name: 'text', title: 'Button Text', type: 'string' },
        { name: 'link', title: 'Link', type: 'string' },
      ],
      hidden: ({ parent }) => parent?.sectionType !== 'craftsmanship',
    }),

    // Testimonials Fields
    defineField({
      name: 'testimonialsTitle',
      title: 'Section Title',
      type: 'string',
      hidden: ({ parent }) => parent?.sectionType !== 'testimonials',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if ((context?.parent as any)?.sectionType === 'testimonials' && !value) {
            return 'Title is required for Testimonials section';
          }
          return true;
        }),
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Testimonial Item',
          fields: [
            {
              name: 'type',
              title: 'Testimonial Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Text Quote', value: 'text' },
                  { title: 'Video Testimonial', value: 'video' },
                  { title: 'Product Review', value: 'product' },
                  { title: 'Press Quote', value: 'press' },
                ],
              },
              validation: (Rule) => Rule.required(),
            },
            // Text testimonial fields
            {
              name: 'quote',
              title: 'Quote',
              type: 'text',
              rows: 3,
              hidden: ({ parent }) => parent?.type !== 'text',
            },
            {
              name: 'name',
              title: 'Author Name',
              type: 'string',
              hidden: ({ parent }) => parent?.type !== 'text',
            },
            {
              name: 'source',
              title: 'Source/Position',
              type: 'string',
              hidden: ({ parent }) => parent?.type !== 'text',
            },
            {
              name: 'title',
              title: 'Author Title/Position',
              type: 'string',
              hidden: ({ parent }) => parent?.type !== 'text',
            },
            // Video testimonial fields
            {
              name: 'media',
              title: 'Video Thumbnail',
              type: 'image',
              options: {
                hotspot: true,
              },
              fields: [
                {
                  name: 'alt',
                  title: 'Alt Text',
                  type: 'string',
                },
              ],
              hidden: ({ parent }) => parent?.type !== 'video',
            },
            {
              name: 'videoQuote',
              title: 'Video Quote (optional)',
              type: 'text',
              rows: 2,
              hidden: ({ parent }) => parent?.type !== 'video',
            },
            // Product review fields
            {
              name: 'product',
              title: 'Product',
              type: 'object',
              fields: [
                { name: 'title', title: 'Product Title', type: 'string' },
                { name: 'handle', title: 'Product Handle', type: 'string' },
              ],
              hidden: ({ parent }) => parent?.type !== 'product',
            },
            {
              name: 'ctaLabel',
              title: 'CTA Label',
              type: 'string',
              hidden: ({ parent }) => parent?.type !== 'product',
            },
            {
              name: 'ctaLink',
              title: 'CTA Link',
              type: 'string',
              hidden: ({ parent }) => parent?.type !== 'product',
            },
            // Press quote fields
            {
              name: 'publication',
              title: 'Source/Publication',
              type: 'string',
              hidden: ({ parent }) => parent?.type !== 'press',
            },
            {
              name: 'pressQuote',
              title: 'Press Quote',
              type: 'text',
              rows: 3,
              hidden: ({ parent }) => parent?.type !== 'press',
            },
            // Common fields for all types
            {
              name: 'rating',
              title: 'Rating (1-5)',
              type: 'number',
              validation: (Rule) => Rule.min(1).max(5),
            },
            {
              name: 'image',
              title: 'Author/Source Image',
              type: 'image',
              options: {
                hotspot: true,
              },
              fields: [
                {
                  name: 'alt',
                  title: 'Alt Text',
                  type: 'string',
                },
              ],
            },
          ],
          preview: {
            select: {
              type: 'type',
              quote: 'quote',
              name: 'name',
              source: 'source',
              publication: 'publication',
              pressQuote: 'pressQuote',
            },
            prepare({ type, quote, name, source, publication, pressQuote }) {
              const displayText = quote || pressQuote || 'No quote';
              const displayAuthor = name || source || publication || 'Unknown';
              return {
                title: `${type.toUpperCase()}: ${displayText.substring(0, 50)}...`,
                subtitle: `by ${displayAuthor}`,
              };
            },
          },
        },
      ],
      hidden: ({ parent }) => parent?.sectionType !== 'testimonials',
    }),

    // Chat Prompt Fields
    defineField({
      name: 'chatTextBlock',
      title: 'Text Content',
      type: 'array',
      of: [{ type: 'block' }],
      hidden: ({ parent }) => parent?.sectionType !== 'chat',
    }),
    defineField({
      name: 'highlightedInstruction',
      title: 'Highlighted Instruction',
      type: 'string',
      hidden: ({ parent }) => parent?.sectionType !== 'chat',
    }),

    // Common Styling Fields
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
      heroTitle: 'heroTitle',
      craftsmanshipTitle: 'craftsmanshipTitle',
      testimonialsTitle: 'testimonialsTitle',
    },
    prepare({ sectionType, sectionName, heroTitle, craftsmanshipTitle, testimonialsTitle }) {
      const displayTitle =
        sectionName ||
        (sectionType === 'hero'
          ? heroTitle
          : sectionType === 'craftsmanship'
            ? craftsmanshipTitle
            : sectionType === 'testimonials'
              ? testimonialsTitle
              : sectionType === 'chat'
                ? 'Chat Prompt'
                : sectionType);

      return {
        title: displayTitle || `Content Section (${sectionType})`,
        subtitle: `Type: ${sectionType}`,
      };
    },
  },
});
