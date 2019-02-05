
module.exports = (hbs) => {
  hbs.registerHelper('containCategory', (user, category, categories, options) => {

    return user.categories.indexOf(category.id) !== -1 || 
      (categories && categories.indexOf(category.id) !== -1) ? 'block' : 'none';
  })
}
