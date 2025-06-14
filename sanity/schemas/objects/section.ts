import { defineField, defineType } from 'sanity';

export const sectionSchema = defineType({
  name: 'section',
  title: 'Section',
  type: 'object',
  fields: [
    defineField({
      name: 'type',
      title: 'Section Type',
      type: 'string',
      options: {
        list: [
          { title: 'Hero Section', value: 'heroSection' },
          { title: 'About Section', value: 'aboutSection' },
          // Add more section types here as needed
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroSection',
      title: 'Hero Section',
      type: 'reference',
      to: [{ type: 'heroSection' }],
      hidden: ({ parent }) => parent?.type !== 'heroSection',
    }),
    defineField({
      name: 'aboutSection',
      title: 'About Section',
      type: 'reference',
      to: [{ type: 'aboutSection' }],
      hidden: ({ parent }) => parent?.type !== 'aboutSection',
    }),
    // Add more section references here as needed
  ],
  preview: {
    select: {
      type: 'type',
      heroTitle: 'heroSection.headline',
      aboutTitle: 'aboutSection.heading',
    },
    prepare({ type, heroTitle, aboutTitle }) {
      return {
        title: type === 'heroSection' ? heroTitle : type === 'aboutSection' ? aboutTitle : type,
        subtitle: `Section Type: ${type}`,
      };
    },
  },
}); 