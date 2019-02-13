module.exports = (hbs) => {
  hbs.registerHelper('ispurchased', (experience, user, options) => {
   const experienceBool = user.purchased.some(userExperience => userExperience == experience.id); 
   const commentBool = experience.comments.some(commentExp => commentExp.user.id === user.id)
       return  experienceBool && !commentBool  ? options.fn(this) : options.inverse(this);
  }),

  hbs.registerHelper('ispurchasedexp', (experience, user, options) => {
    const experienceBool = user.purchased.some(userExperience => userExperience == experience.id); 
    console.log(experienceBool)
        return  experienceBool ? options.fn(this) : options.inverse(this);
   }),

  hbs.registerHelper('theCreator', (experience, user, options) => {
   const creator = experience.user.id === user.id
       return  creator  ? options.fn(this) : options.inverse(this);
  })
  hbs.registerHelper('rating', (experience, options) => {
    const numComment = experience.comments.length;
    const rating = experience.comments.map(comment => comment.rate).reduce((a,b) => a + b, 0)/ numComment
    if(!rating){
      return "This experience doesn't have any rating " 
    } else { 
      return `${rating}/5`
    }
  })
}