module.exports = (hbs) => {
  hbs.registerHelper('containCategoryCreate', (category, categories, options) => {

    return (categories && categories.indexOf(category.id) !== -1) ? 'checked' : '';
  })
}