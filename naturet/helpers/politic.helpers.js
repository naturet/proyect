

module.exports = (hbs) => {
  hbs.registerHelper('isPoliticSelected', (user, politic, politics, options) => {
    console.log(user.politic)
    return user.politic.indexOf(politic.name) !== -1 || 
      (politics && politics.indexOf(politic.name) !== -1) ? 'checked' : '';
  })
}

