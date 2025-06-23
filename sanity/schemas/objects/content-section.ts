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
      name: 'title',
      title: 'Title',
      type: 'string',
      hidden: ({ parent }) => parent?.sectionType !== 'hero',
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'text',
      rows: 2,
      hidden: ({ parent }) => parent?.sectionType !== 'hero',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      hidden: ({ parent }) => parent?.sectionType !== 'hero',
    }),
    defineField({
      name: 'primaryCTA',
      title: 'Primary Call to Action',
      type: 'object',
      fields: [
        { name: 'text', title: 'Button Text', type: 'string' },
        { name: 'link', title: 'Link', type: 'string' },
      ],
      hidden: ({ parent }) => parent?.sectionType !== 'hero',
    }),
    defineField({
      name: 'secondaryCTA',
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
      hidden: ({ parent }) => parent?.sectionType !== 'hero',
    }),

    // Craftsmanship Story Fields
    defineField({
      name: 'craftsmanshipTitle',
      title: 'Title',
      type: 'string',
      hidden: ({ parent }) => parent?.sectionType !== 'craftsmanship',
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
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'quote', title: 'Quote', type: 'text', rows: 3 },
            { name: 'author', title: 'Author Name', type: 'string' },
            { name: 'image', title: 'Author Image', type: 'image' },
            { 
              name: 'rating', 
              title: 'Rating', 
              type: 'number',
              validation: (Rule) => Rule.min(1).max(5),
            },
          ],
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
      title: 'title',
      craftsmanshipTitle: 'craftsmanshipTitle',
      testimonialsTitle: 'testimonialsTitle',
    },
    prepare({ sectionType, sectionName, title, craftsmanshipTitle, testimonialsTitle }) {
      const displayTitle = sectionName || 
        (sectionType === 'hero' ? title :
         sectionType === 'craftsmanship' ? craftsmanshipTitle :
         sectionType === 'testimonials' ? testimonialsTitle :
         sectionType === 'chat' ? 'Chat Prompt' : sectionType);
      
      return {
        title: displayTitle || `Content Section (${sectionType})`,
        subtitle: `Type: ${sectionType}`,
      };
    },
  },
}); 