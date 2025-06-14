import { groq } from 'next-sanity';

export const footerQuery = groq`
  *[_type == "footer"][0] {
    navigation[] {
      title,
      links[] {
        label,
        href
      }
    },
    social[] {
      name,
      url
    },
    bottomText
  }
`; 