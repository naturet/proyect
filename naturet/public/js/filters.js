$('#filter-button').click( function(){
  console.log('entra')
  var filterWordValue = $('#filter-word').val();
  window.location = `/experiences/results?name=${filterWordValue}`
})