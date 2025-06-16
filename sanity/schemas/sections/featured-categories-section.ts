import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'featuredCategoriesSection',
  title: 'Featured Categories Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Category Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'slug',
              title: 'Category Slug',
              type: 'slug',
              options: {
                source: 'title',
                maxLength: 96,
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Category Description',
              type: 'text',
            }),
            defineField({
              name: 'image',
              title: 'Category Image',
              type: 'image',
              options: {
                hotspot: true,
              },
              fields: [
                {
                  name: 'alt',
                  type: 'string',
                  title: 'Alternative Text',
                  description: 'Important for SEO and accessibility.',
                },
              ],
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'title',
              media: 'image',
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(3).max(6),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      categories: 'categories',
    },
    prepare({ title, categories }) {
      return {
        title,
        subtitle: `${categories?.length || 0} categories`,
      };
    },
  },
});
