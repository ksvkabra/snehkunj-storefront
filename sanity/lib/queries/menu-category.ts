import { groq } from 'next-sanity';

// Debug query to check all documents
export const debugAllDocumentsQuery = groq`
  *[] {
    _id,
    _type
  }
`;

export const menuCategoriesQuery = groq`
  *[_type == "menuCategory"] | order(order asc) {
    _id,
    _type,
    name,
    slug,
    order,
    children[] {
      _key,
      name,
      slug,
      children[] {
        _key,
        name,
        slug
      }
    }
  }
`; 