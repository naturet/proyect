const createError = require("http-errors");
const mongoose = require("mongoose");
const Experience = require("../models/experience.model");
const User = require("../models/user.model");
const passport = require("passport");
const Comment = require("../models/comment.model");
const Payment = require("../models/payment.model");
const axios = require("axios");
// Stripe //
const keyPublishable = process.env.PUBLISHABLE_STRIPE_KEY;
const keySecret = process.env.SECRET_STRIPE_KEY;
const stripe = require("stripe")(keySecret);
const transporter = require('../configs/nodemailer.config');
const hbs = require('nodemailer-express-handlebars');


//nodemailer.../


module.exports.send = (req, res, next) => {
  

  transporter.use('compile',hbs({
    viewPath: 'views/email',
    extName: '.hbs'
  }))

  const mailOptions = {
    from: 'moisesgarcia83@gmail.com',
    to: req.user.email,
    subject: 'Sending Email using Naturapp',
    template: 'payment',
    context: {session: req.user, experience: req.experience}
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else { 
        console.log('Email sent: ' + info.response);  
    }
  }) 

}



module.exports.results = (req, res, next) => {
  const { name, category } = req.query
  const criteria = {};

  if (name) {
    criteria.name = new RegExp(name, 'i')
  }
  if (category) {
    criteria.categories = {
      $all: category.split(',')
    }
  }

  Experience.find(criteria)
    .then(experiences =>
      res.render('users/results', {
        experiences
      })
    ).catch(error => next(error));
}


module.exports.comment = (req, res, next) => {
  res.render("experiences/detail");

};

module.exports.doComment = (req, res, next) => {

  const commentData = {
    message: req.body.message,
    user: req.user.id,
    experience: req.params.id,
    rate: req.body.rate,
    date: new Date()
  };

  const message = req.body.message;

  if (!commentData.message || !commentData.rate) {
    Experience.findById(req.params.id)
      .populate('user')
      .populate({
        path: 'comments',
        populate: {
          path: 'user',
        },
      })
      .then(experience => {
        res.render('experiences/detail', {
            experience,
            message,
            pointsJSON: encodeURIComponent(JSON.stringify(experience.location.coordinates)),
            errors: {
              message: req.body.message ? undefined : 'Message is required',
              rate: req.body.rate ? undefined : 'Rate the experience'
            }
          })
          .catch(error => next(error));
      })
  } else {
    const comment = new Comment(commentData);
    return comment
      .save()  
      .then(comment => {
        if (!comment) {
          next();
        } else {
          Experience.findById(req.params.id)
          .populate({
            path: 'comments',
            populate: {
              path: 'user',
            },
          })
          .then(experience => {
            const numComment = experience.comments.length;
            const finalRating = experience.comments.map(comment => comment.rate).reduce((a,b) => a + b, 0)/ numComment
            experience.set('rating', finalRating);
            experience.save()
            .then(() =>
            res.redirect(`/experiences/${commentData.experience}`)
          )
          })
        }
      })
      .catch(error => next(error));
  }
};


module.exports.get = (req, res, next) => {
  const id = req.params.id;
  Experience.findById(id)
    .populate('user')
    .populate({
      path: 'comments',
      populate: {
        path: 'user',
      }
    })
    .then(experience => {
      res.render('experiences/detail', {
        experience,
        pointsJSON: encodeURIComponent(JSON.stringify(experience.location.coordinates))
      })
    })
    .catch(err => next(err));
}

module.exports.delete = (req, res, next) => {
  const id = req.params.id;
  Experience.findByIdAndDelete(id)
    .populate("user")
    .then(experience => res.redirect('/profile'))
    .catch(err => next(err));
}

module.exports.create = (req, res, next) => {
  res.render("experiences/form");
};

module.exports.doCreate = (req, res, next) => {

  if (req.body.path) {
    req.body.path = req.body.path.map(x => x.split(",").map(n => Number(n)));
  }

  const experienceData = {
    name: req.body.name,
    description: req.body.description,
    anymore: req.body.anymore,
    price: req.body.price,
    photo: req.body.photo,
    categories: req.body.categories,
    languages: req.body.languages,
    duration: req.body.duration,
    includes: req.body.includes,
    photos: req.files ? req.files.map(file => file.secure_url) : '',
    location: {
      type: "LineString",
      coordinates: req.body.path
    }
  };


  const categories = typeof (req.body.categories) === 'string' ? [req.body.categories] : req.body.categories;

  const name = req.body.name;
  const description = req.body.description;
  const price = req.body.price;

  if (!categories || categories.length <= 3 || !name || !price || !description || !req.body.path) {

    res.render('experiences/form', {
      name,
      categories: categories,
      price,
      description,
      ...(req.body.path ? {
        pointsJSON: encodeURIComponent(JSON.stringify(req.body.path))
      } : null),
      errors: {
        ...(!categories || categories.length <= 3 ? {
          categories: 'Choose at least 4 categories'
        } : null),
        name: name ? undefined : 'Select one name for your experience',
        description: description ? undefined : 'Add some awesome description to your experience',
        price: price ? undefined : 'Select some price to your experience from 0 to your choice',
        bodyPath: 'No route drawn!, add some points by clicking the map'
      }
    });
  } else {

    const experience = new Experience(experienceData);
    experience.user = req.user._id;
    return experience
      .populate('comments') //esto no es seguro hay que hablarlo con carlos
      .save()
      .then(experience => {
        res.redirect("/profile");
      })
      .catch(error => next(error));
  }
};


module.exports.unFollow = (req, res, next) => {
  const id = req.params.id;
  Experience.findById(id)
    .populate('following')
    .populate('user')
    .then(experience => {
      if (!experience) {
        next();
      } else {

        return User.findByIdAndUpdate(req.user.id, {
            $pull: {
              following: experience.id
            }
          })
          .populate('following')
          .populate('experience')
          .then(() =>
            res.json({
              OK: true,
            }))
      }
    })
    .catch(error => next(error));
}




module.exports.follow = (req, res, next) => {
  const id = req.params.id;
  Experience.findById(id)
    .populate('following')
    .then(experience => {
      if (!experience) {
        next();
      } else {
        return User.findByIdAndUpdate(req.user.id, {
            $addToSet: {
              following: experience.id
            }
          })
          .populate('following')
          .populate('experience')
          .then((user) =>
            res.status(204).json())
      }
    })
    .catch(error => next(error));
}

module.exports.purchased = (req, res, next) => {
  console.log(req.params.id)
  Experience.findById(req.params.id)
    .then(experience => {
      console.log(experience)
      if (experience) {
        stripe.customers.create({
            email: req.body.stripeEmail,
            source: req.body.stripeToken
          })
          .then(costumer => {
            console.log('entra 1')
            stripe.charges.create({
              amount: experience.price,
              description: `Buy: ${experience.name}`,
              currency: "EUR",
              customer: costumer.id
            })
          })
          .then(charge => {
            console.log(charge)
            const paymentData = {
              user: req.user.id,
              experience: req.params.id,
            };
            const payment = new Payment(paymentData)
            return payment
              .save()
              .then(() => {
                return User.findByIdAndUpdate(req.user.id, {
                    $addToSet: {
                      purchased: experience.id
                    }
                  })
                  .populate('purchased')
                  .then(() =>
                    res.redirect(`/experiences/${experience.id}/thankyou`))
              })
          })
      }
    })
    .catch(error => next(error));
}


module.exports.thankyou = (req, res, next) => {
  Experience.findById(req.params.id)
    .populate('user')
    .then(experience => {
      if (experience) {
        res.render('experiences/thankyou', {
          experience
        })
      }
    })
    .catch(error => next(error));
}

module.exports.paypage = (req, res, next) => {
  Experience.findById(req.params.id)
    .populate('user')
    .then(experience => {
      if (experience) {
        res.render('experiences/paypage', {
          experience
        })
      }
    })
    .catch(error => next(error));
}