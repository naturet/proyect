const hbs = require('hbs');
const path = require('path');

hbs.registerPartials(path.join(__dirname, '../views/partials'));
require('../helpers/category.helpers')(hbs);
require('../helpers/user.helpers')(hbs);
require('../helpers/pictures.helpers')(hbs);
require('../helpers/equalcheck.helpers')(hbs);
require('../helpers/politic.helpers')(hbs);
require('../helpers/creator.helpers')(hbs);
require('../helpers/formatDate.helpers')(hbs);

// experiences

require('../helpers/follow.helpers')(hbs);
require('../helpers/purchased.helpers')(hbs);