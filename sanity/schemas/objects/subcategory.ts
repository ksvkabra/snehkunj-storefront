import { slugField } from './slug';
import { subSubcategorySchema } from './sub-subcategory';

export const subcategorySchema = {
  name: 'subcategory',
  title: 'Subcategory',
  type: 'object',
  fields: [
    {
      name: 'name',
      title: 'Subcategory Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    slugField,
    {
      name: 'children',
      title: 'Sub-subcategories',
      type: 'array',
      of: [subSubcategorySchema],
    },
  ],
  preview: {
    select: {
      title: 'name',
    },
  },
}; 