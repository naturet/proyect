$('#filter-button').click( function(){
  console.log('entra')
  var filterWordValue = $('#filter-word').val();
  window.location = `/experiences/results?name=${filterWordValue}`
})

$('.category-name-home').click( function(){
  console.log('entra')
  var filterWordValue = $(this).attr('data-category')
  window.location = `/experiences/results?category=${filterWordValue}`
})

$('.category-tag').click( function(){
  console.log('entra')
  var filterWordValue = $(this).attr('data-category')
  window.location = `/experiences/results?category=${filterWordValue}`
})

