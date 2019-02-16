$(document).ready(() => {
  
  const finalPrice = $(".total-span").text() * 100
    $("#paybtn").remove();
    $("#stripe-form").prepend(
    `<div id="paybtn"><script src="https://checkout.stripe.com/checkout.js" class="stripe-button" id="stripe-script" data-key="pk_test_zcTEmEh9DNzx17DvNLibaUVS"
     data-locale="es" data-currency="EUR" data-amount=${finalPrice}></script></div>`
  );

  var favBtn = $('#fav-btn')
  function doFav(event) {
    const experienceId = event.target.value;
    if (experienceId) {
      console.log(event.target);
      if (favBtn.hasClass('unfollow')) {
        axios.post(`/experiences/${experienceId}/follow`, { method: "post", withCredentials: true })
          .then(response => {
            favBtn.removeClass('unfollow')
            favBtn.children('i').removeClass('far').addClass('fas')
          })
          .catch(error => console.error(error));
      } else {
        axios.post(`/experiences/${experienceId}/unfollow`, { method: "post", withCredentials: true })
          .then(response => {
            favBtn.addClass('unfollow')
            favBtn.children('i').removeClass('fas').addClass('far')
          })
          .catch(error => console.error(error));
      }
    }
  }
  
  $('input[name="qty"]').on('change', function() {
  const priceProduct = $('.price-span').text();
  const qtyProduct =  $('input[name="qty"]').val();
    const priceTotal = priceProduct * qtyProduct;
    $(".total-span").text(priceTotal);
    const finalPrice = priceTotal * 100
    $("#paybtn").remove();
    $("#stripe-form").prepend(
    `<div id="paybtn"><script src="https://checkout.stripe.com/checkout.js" class="stripe-button" id="stripe-script" data-key="pk_test_zcTEmEh9DNzx17DvNLibaUVS"
     data-locale="es" data-currency="EUR" data-amount=${finalPrice}></script></div>`
  );

  })

  $('#checked').click(function() {  
    if ($('#checked').prop("checked")){
      $('#stripe-form').show() 
    } else {
      $('#stripe-form').hide()
    }   
  })
 
  favBtn.click(doFav)
})