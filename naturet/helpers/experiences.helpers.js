module.exports = (hbs) => {
  hbs.registerHelper('isCategoryExpSelected', (experience, category, categories, options) => {

    return experience.categories.indexOf(category.id) !== -1 ||
      (categories && categories.indexOf(category.id) !== -1) ? 'checked' : '';
  })

  // objs.sort((a,b) => (a.last_nom > b.last_nom) ? 1 : ((b.last_nom > a.last_nom) ? -1 : 0)); 

}