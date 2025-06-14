export const slugField = {
  name: 'slug',
  title: 'Slug',
  type: 'slug',
  options: {
    source: 'name',
    maxLength: 96,
  },
  validation: (Rule: any) => Rule.required(),
}; 