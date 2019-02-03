const hbs = require('hbs');
const path = require('path');

hbs.registerPartials(path.join(__dirname, '../views/partials'));
require('../helpers/category.helpers')(hbs);
require('../helpers/user.helpers')(hbs);
require('../helpers/categoryshow.helpers')(hbs);
