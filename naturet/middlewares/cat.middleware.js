
module.exports.isProfileCompleted = (res, req, next) => {
 if(req.user.categories.length >= 3) {
  next();
 } 
}