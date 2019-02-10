
 module.exports = (hbs) => {
   hbs.registerHelper('isfollow', (experience, user, options) => {
     const experienceBool = user.following.some(userExperience => userExperience.id === experience.id);
        return experienceBool ? options.fn(this) : options.inverse(this);
   })
 }
