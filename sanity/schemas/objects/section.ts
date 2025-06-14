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
          { title: 'Testimonials Section', value: 'testimonialsSection' },
          { title: 'Featured Categories Section', value: 'featuredCategoriesSection' },
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
    defineField({
      name: 'testimonialsSection',
      title: 'Testimonials Section',
      type: 'reference',
      to: [{ type: 'testimonialsSection' }],
      hidden: ({ parent }) => parent?.type !== 'testimonialsSection',
    }),
    defineField({
      name: 'featuredCategoriesSection',
      title: 'Featured Categories Section',
      type: 'reference',
      to: [{ type: 'featuredCategoriesSection' }],
      hidden: ({ parent }) => parent?.type !== 'featuredCategoriesSection',
    }),
    // Add more section references here as needed
  ],
  preview: {
    select: {
      type: 'type',
      heroTitle: 'heroSection.headline',
      aboutTitle: 'aboutSection.heading',
      testimonialsTitle: 'testimonialsSection.title',
      categoriesTitle: 'featuredCategoriesSection.title',
    },
    prepare({ type, heroTitle, aboutTitle, testimonialsTitle, categoriesTitle }) {
      return {
        title: type === 'heroSection' ? heroTitle : 
               type === 'aboutSection' ? aboutTitle :
               type === 'testimonialsSection' ? testimonialsTitle :
               type === 'featuredCategoriesSection' ? categoriesTitle : type,
        subtitle: `Section Type: ${type}`,
      };
    },
  },
}); 