
module.exports = (hbs) => {
  hbs.registerHelper('isCategorySelected', (user, category, categories, options) => {

    console.log('category', category);
    console.log('categories', categories);
    console.log('assertion', categories && categories[category.id]);

    return user.categories.indexOf(category.id) !== -1 || 
      (categories && categories.indexOf(category.id) !== -1) ? 'checked' : '';
  })
}