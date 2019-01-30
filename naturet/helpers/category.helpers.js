
module.exports = (hbs) => {
  hbs.registerHelper('isCategorySelected', (user, category, categories, options) => {
    // if (user.role === constants.ROLE_ADMIN) {
    console.log('category', category);
    console.log('categories', categories);
    console.log('assertion', categories && categories[category.id]);

    return user.categories.indexOf(category.id) !== -1 || 
      (categories && categories.indexOf(category.id)) ? 'checked' : '';
  })
}