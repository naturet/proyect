module.exports = (hbs) => {
  hbs.registerHelper('ispurchased', (experience, user, options) => {
   const experienceBool = user.purchased.some(userExperience => userExperience == experience.id); 
   const commentBool = experience.comments.some(commentExp => commentExp.user.id === user.id)
       return  experienceBool && !commentBool  ? options.fn(this) : options.inverse(this);
  })
  hbs.registerHelper('ispurchasedexp', (experience, user, options) => {
    const experienceBool = user.purchased.some(userExperience => userExperience == experience.id); 
    console.log(experienceBool)
        return  experienceBool ? options.fn(this) : options.inverse(this);
   })
  hbs.registerHelper('theCreator', (experience, user, options) => {
   const creator = experience.user.id === user.id
       return  creator  ? options.fn(this) : options.inverse(this);
  })
  hbs.registerHelper('rating', (experience, options) => {
    const rating = experience.rating
    if(!rating){
      return "This experience doesn't have any rating " 
    } else { 
      return `${rating}/5 <i class='fa fa-star fa-fw'></i>`
    }
  })
  hbs.registerHelper('isfollow', (experience, user, options) => {
    const experienceBool = user.following.some(userExperience => userExperience.id === experience.id);
        return experienceBool ? new hbs.SafeString(options.fn(this)) : new hbs.SafeString(options.inverse(this));
   })
  hbs.registerHelper('formatDate', (date, options) => {
    let array = date.toString().split(' ');
   return `${array[1]} ${array[2]} ${array[3]}`;
  })
  hbs.registerHelper('formatName', (name, options) => {
    let array = name.toString().split(' ');
   return `${array[0]}`;
  })
  hbs.registerHelper('ifCond', function (v1, v2, options) {
    if (v1 === v2) {
      return 'checked'
    }
    return options.inverse(this);
  })
}