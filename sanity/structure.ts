// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: any = (S: any) =>
  S.list()
    .title('Content')
    .items([
      // Homepage
      S.listItem()
        .title('Homepage')
        .child(
          S.documentTypeList('homePage')
            .title('Homepage')
        ),
      
      S.divider(),
      
      // Pages
      S.listItem()
        .title('Pages')
        .child(
          S.documentTypeList('page')
            .title('Pages')
        ),
      
      // Blog
      S.listItem()
        .title('Blog')
        .child(
          S.list()
            .title('Blog')
            .items([
              S.documentTypeListItem('post').title('Posts'),
              S.documentTypeListItem('category').title('Categories'),
              S.documentTypeListItem('author').title('Authors'),
            ])
        ),
      
      // Navigation
      S.listItem()
        .title('Navigation')
        .child(
          S.list()
            .title('Navigation')
            .items([
              S.documentTypeListItem('menuCategory').title('Menu Categories'),
            ])
        ),
      
      // Global Components
      S.listItem()
        .title('Global Components')
        .child(
          S.list()
            .title('Global Components')
            .items([
              S.documentTypeListItem('globalFooter').title('Footer'),
            ])
        ),
      
      S.divider(),
      
      // Legacy Schemas (for backward compatibility)
      ...S.documentTypeListItems().filter((item: any) => 
        item.getId() && 
        !['homePage', 'page', 'post', 'category', 'author', 'menuCategory', 'globalFooter'].includes(item.getId()!)
      ),
    ]);
