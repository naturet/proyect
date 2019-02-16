
 module.exports = (hbs) => {
   hbs.registerHelper('isfollow', (experience, user, options) => {
    const experienceBool = user.following.some(userExperience => userExperience.id === experience.id);
        return experienceBool ? new hbs.SafeString(options.fn(this)) : new hbs.SafeString(options.inverse(this));
   })
 }
