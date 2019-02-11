module.exports = (hbs) => {
  hbs.registerHelper('ispurchased', (experience, user, options) => {
   const experienceBool = user.purchased.some(userExperience => userExperience == experience.id); 
   const commentBool = experience.comments.some(commentExp => commentExp.user.id === user.id)
       return  experienceBool && !commentBool  ? options.fn(this) : options.inverse(this);
  }),
  hbs.registerHelper('theCreator', (experience, user, options) => {
   
   const creator = experience.user.id === user.id
   
       return  creator  ? options.fn(this) : options.inverse(this);
  }) // preparado por si queremos ocultar purchased y following cuando eres creador de esa experiencia
}