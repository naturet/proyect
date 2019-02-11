


$(document).ready(() => {
  var favBtn = $('#fav-btn')
  console.log(favBtn)
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

  favBtn.click(doFav)
})
  

  
