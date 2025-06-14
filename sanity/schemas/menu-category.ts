import { slugField } from './objects/slug';
import { subSubcategorySchema } from './objects/sub-subcategory';

export default {
  name: 'menuCategory',
  title: 'Menu Category',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Category Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    slugField,
    {
      name: 'children',
      title: 'Subcategories',
      type: 'array',
      of: [subSubcategorySchema],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      validation: (Rule: any) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'order',
    },
    prepare({ title, subtitle }: { title: string; subtitle: number }) {
      return {
        title,
        subtitle: `Order: ${subtitle}`,
      };
    },
  },
};
