$(document).ready(function () {
  $('.costumer-categories').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    infinite: true,
    pauseOnHover: false,
    responsive: [{
      breakpoint: 768,
      settings: {
        arrows: false,
        slidesToShow: 2
      }
    }, {
      breakpoint: 520,
      settings: {
        arrows: true,
        slidesToShow: 1
      }
    }, {
      breakpoint: 1068,
      settings: {
        arrows: false,
        slidesToShow: 3
      }
    }]
  });
});


$(document).ready(function () {
  $('.customer-experiencer').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    infinite: false,
    pauseOnHover: false,
    responsive: [{
      breakpoint: 768,
      settings: {
        arrows: false,
        slidesToShow: 2
      }
    }, {
      breakpoint: 520,
      settings: {
        arrows: false,
        slidesToShow: 1
      }
    }, {
      breakpoint: 1068,
      settings: {
        arrows: false,
        slidesToShow: 3
      }
    }]
  });
});



$(document).ready(function () {
  $('.customer-experiencer-session').slick({
    swipe: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    infinite: false,
    pauseOnHover: false,
    responsive: [{
      breakpoint: 768,
      settings: {
        arrows: false,
        slidesToShow: 2
      }
    }, {
      breakpoint: 520,
      settings: {
        swipe: true,
        arrows: false,
        slidesToShow: 1
      }
    }, {
      breakpoint: 1068,
      settings: {
        arrows: false,
        slidesToShow: 3
      }
    }]
  });
});
