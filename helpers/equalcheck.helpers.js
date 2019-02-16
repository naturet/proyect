module.exports = (hbs) => {
  hbs.registerHelper('ifCond', function (v1, v2, options) {
    if (v1 === v2) {
      return 'checked'
    }
    return options.inverse(this);
  });
}