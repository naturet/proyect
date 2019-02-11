


  var favBtn = $('#fav-btn')
  console.log(favBtn)
  function doFav(event) {
    if (favBtn.hasClass('unfollow')) {
      const experienceId = event.target.value;
      axios.post(`/experiences/${experienceId}/follow`, { method: "post", withCredentials: true })
        .then(response => {
          console.log('follow')
          favBtn.removeClass('unfollow')
          favBtn.children('i').removeClass('far').addClass('fas')
        })
        .catch(error => console.log(error));
    } else {
      const experienceId = event.target.value;
      axios.post(`/experiences/${experienceId}/unfollow`, { method: "post", withCredentials: true })
        .then(response => {
          console.log('unfollow')
          favBtn.addClass('unfollow')
          favBtn.children('i').removeClass('fas').addClass('far')
        })
    }
  }

  favBtn.click(doFav)

  
