import author from './author';
import blockContent from './block-content';
import category from './category';
import menuCategory from './menu-category';
import page from './page';
import post from './post';

// New modular homepage schemas
import homePage from './home-page';
import categorySection from './objects/category-section';
import contentSection from './objects/content-section';
import globalFooter from './objects/global-footer';
import imageSection from './objects/image-section';
import layoutSection from './objects/layout-section';
import productSection from './objects/product-section';
import shopifySection from './objects/shopify-section';

export const schemaTypes = [
  author,
  blockContent,
  category,
  menuCategory,
  page,
  post,
  
  // New modular homepage schemas
  homePage,
  contentSection,
  imageSection,
  productSection,
  categorySection,
  layoutSection,
  globalFooter,
  shopifySection,
];
