$(document).ready(() => {

  const sendMail = $("#sendSub");

  function subscribe() {

    var to = $("#subscribe").val()
    if (to === "") {
      $('#sendSub').notify(
        "Please, introduce your email", {
          elementPosition: 'bottomleft'
        }
      );
    } else {
      axios.post(`/subscribe`, {
          to: to,
          method: "post",
          withCredentials: true
        })
        .then(() => {
          $('#sendSub').notify(
            "You are subscribed !!!", "success", {
              elementPosition: 'topleft'
            }
          );
        })
        .catch(error => console.error(error));
    }

  }
  sendMail.click(subscribe)
})