const constants = require('../constants');

module.exports = (hbs) => {
  hbs.registerHelper('isAdmin', (user, options) => {
    if (user.role === constants.ROLE_ADMIN) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  })
  hbs.registerHelper('isCreator', (user, options) => {
    if (user.creator) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  })
  hbs.registerHelper('isPoliticSelected', (user, politic, politics, options) => {
    return user.politic.indexOf(politic.name) !== -1 ||
      (politics && politics.indexOf(politic.name) !== -1) ? 'checked' : '';
  })
}