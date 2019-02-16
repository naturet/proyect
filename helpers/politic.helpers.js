module.exports = (hbs) => {
  hbs.registerHelper('isPoliticSelected', (user, politic, politics, options) => {
    
    return user.politic.indexOf(politic.name) !== -1 ||
      (politics && politics.indexOf(politic.name) !== -1) ? 'checked' : '';
  })
}