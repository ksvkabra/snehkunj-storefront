// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: any = (S: any) =>
  S.list()
    .title('Content')
    .items([
      // Homepage (Singleton - should only have one)
      S.listItem()
        .title('Homepage')
        .child(
          S.documentTypeList('homePage')
            .title('Homepage')
            .filter('_type == "homePage"')
        ),
      
      S.divider(),
      
      // Global Components (Singletons - should only have one each)
      S.listItem()
        .title('Global Components')
        .child(
          S.list()
            .title('Global Components')
            .items([
              // Header (Singleton)
              S.listItem()
                .title('Header')
                .child(
                  S.documentTypeList('header')
                    .title('Header')
                    .filter('_type == "header"')
                ),
              // Footer (Singleton)
              S.listItem()
                .title('Footer')
                .child(
                  S.documentTypeList('globalFooter')
                    .title('Footer')
                    .filter('_type == "globalFooter"')
                ),
            ])
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
      
      S.divider(),
      
      // Legacy Schemas (for backward compatibility)
      ...S.documentTypeListItems().filter((item: any) => 
        item.getId() && 
        !['homePage', 'header', 'globalFooter', 'page', 'post', 'category', 'author', 'menuCategory'].includes(item.getId()!)
      ),
    ]);
