module.exports = (hbs) => {
  hbs.registerHelper('containCategoryexp', (experience, category, categories, options) => {

    return experience.categories.indexOf(category.id) !== -1 ||
      (categories && categories.indexOf(category.id) !== -1) ? 'block' : 'none';
  })
}