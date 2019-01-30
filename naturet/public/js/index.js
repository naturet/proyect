var MemoryGame = function (cards) {
  this.cards = cards;
  this.pickedCards = [];
  this.pairsClicked = 0;
  this.pairsGuessed = 0;
};

$(window).on("load", function () {
  $.fn.hasProp = function (name, val) {
    if (val) {
      return $(this).prop(name) === val;
    }
    return $(this).prop(name) !== undefined;
  };
  var prop = 'checked';
  var val = true;
  var isChecked = $(this).hasProp(prop, val);

  $(".input-category").change(function () {
    var prop = 'checked';
    var val = true;
    var isChecked = $(this).hasProp(prop, val);

    if (isChecked) {
      $(this).siblings('.category-card').addClass("category-selected")
    } else {
      $(this).siblings('.category-card').removeClass("category-selected")
    }
  }).change();
});

$('.category-card').on('click', function (e) {
  $(this).toggleClass("category-selected");
  e.preventDefault();

  if ($(this).hasClass('category-selected')) {
    $(this).siblings('.input-category').prop('checked', true)
  } else {
    $(this).siblings('.input-category').prop('checked', false)
  }
});