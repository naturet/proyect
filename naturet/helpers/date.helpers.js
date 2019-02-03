
module.exports = (hbs) => {
  hbs.registerHelper('dateFormat', (user) => {
    return user.birth
  })
}
