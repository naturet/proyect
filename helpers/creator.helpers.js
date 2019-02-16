module.exports = (hbs) => {
  hbs.registerHelper('isCreator', (user, options) => {
    if (user.creator) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  })
}