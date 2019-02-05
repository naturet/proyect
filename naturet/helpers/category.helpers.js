
module.exports = (hbs) => {
  hbs.registerHelper('isCategorySelected', (user, category, categories, options) => {
    console.log(user.categories)
    return user.categories.indexOf(category.id) !== -1 || 
      (categories && categories.indexOf(category.id) !== -1) ? 'checked' : '';
  })
}

