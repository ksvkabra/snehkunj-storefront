import { slugField } from './slug';

export const subSubcategorySchema = {
  name: 'subSubcategory',
  title: 'Sub-subcategory',
  type: 'object',
  fields: [
    {
      name: 'name',
      title: 'Sub-subcategory Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    slugField,
  ],
}; 