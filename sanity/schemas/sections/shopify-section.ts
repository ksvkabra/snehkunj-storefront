import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'shopifySection',
  title: 'Shopify Section',
  type: 'document',
  fields: [
    defineField({
      name: 'sectionName',
      title: 'Section Name',
      type: 'string',
      description: 'The name of the Shopify section to render (e.g., "featured-collection", "product-grid")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sectionId',
      title: 'Section ID',
      type: 'string',
      description: 'Optional: The ID of the section if you want to target a specific instance',
    }),
  ],
  preview: {
    select: {
      title: 'sectionName',
      subtitle: 'sectionId',
    },
    prepare({ title, subtitle }) {
      return {
        title: `Shopify: ${title}`,
        subtitle: subtitle ? `ID: ${subtitle}` : undefined,
      };
    },
  },
}); 