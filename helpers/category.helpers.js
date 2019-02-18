module.exports = (hbs) => {
  hbs.registerHelper('isCategorySelected', (user, category, categories, options) => {
    return user.categories.indexOf(category.id) !== -1 ||
      (categories && categories.indexOf(category.id) !== -1) ? 'checked' : '';
  })
  hbs.registerHelper('containCategoryCreate', (category, categories, options) => {

    return (categories && categories.indexOf(category.id) !== -1) ? 'checked' : '';
  })
  hbs.registerHelper('containCategory', (user, category, categories, options) => {

    return user.categories.indexOf(category.id) !== -1 ||
      (categories && categories.indexOf(category.id) !== -1) ? 'block' : 'none';
  })
  hbs.registerHelper('containCategoryexp', (experience, category, categories, options) => {

    return experience.categories.indexOf(category.id) !== -1 ||
      (categories && categories.indexOf(category.id) !== -1) ? 'block' : 'none';
  })
  hbs.registerHelper('isCategoryExpSelected', (experience, category, categories, options) => {

    return experience.categories.indexOf(category.id) !== -1 ||
      (categories && categories.indexOf(category.id) !== -1) ? 'checked' : '';
  })
}