module.exports = (hbs) => {
  hbs.registerHelper('ispurchased', (experience, user, options) => {
   const experienceBool = user.purchased.some(userExperience => userExperience == experience.id);
       return experienceBool ? options.fn(this) : options.inverse(this);
  })
}