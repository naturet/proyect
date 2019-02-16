$('#filter-button').click( function(){
  var filterWordValue = $('#filter-word').val();
  window.location = `/experiences/results?name=${filterWordValue}`
})

$('#filter-button-mobile').click( function(){
  var filterWordValue = $('#filter-word-mobile').val();
  window.location = `/experiences/results?name=${filterWordValue}`
})

$('.category-name-home').click( function(){
  var filterWordValue = $(this).attr('data-category').toLowerCase()
  window.location = `/experiences/results?category=${filterWordValue}`
})

$('.category-tag').click( function(){
  var filterWordValue = $(this).attr('data-category').toLowerCase()
  window.location = `/experiences/results?category=${filterWordValue}`
})

