const hbs = require('hbs');
const path = require('path');

hbs.registerPartials(path.join(__dirname, '../views/partials'));
require('../helpers/category.helpers')(hbs);
require('../helpers/user.helpers')(hbs);
require('../helpers/categoryshow.helpers')(hbs);
require('../helpers/pictures.helpers')(hbs);
require('../helpers/equalcheck.helpers')(hbs);
require('../helpers/politic.helpers')(hbs);
require('../helpers/creator.helpers')(hbs);
require('../helpers/categorycreate.helpers')(hbs);

// experiences

require('../helpers/categoryshowexp.helpers')(hbs);
require('../helpers/experiences.helpers')(hbs);
require('../helpers/follow.helpers')(hbs);