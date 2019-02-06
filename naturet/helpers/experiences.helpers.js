module.exports = (hbs) => {
  hbs.registerHelper('isCategoryExpSelected', (experience, category, categories, options) => {

    return experience.categories.indexOf(category.id) !== -1 ||
      (categories && categories.indexOf(category.id) !== -1) ? 'checked' : '';
  })
}