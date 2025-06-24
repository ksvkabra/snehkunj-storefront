export const headerQuery = `
  *[_type == "header" && isActive == true][0] {
    _id,
    _type,
    title,
    logo {
      text,
      image,
      link
    },
    search {
      enabled,
      placeholder
    },
    languageSelector {
      enabled,
      defaultLanguage,
      availableLanguages
    },
    userAccount {
      enabled,
      showWishlist
    },
    styling {
      backgroundColor,
      textColor,
      hoverColor
    },
    isActive
  }
`; 