$(document).ready(() => {

  const sendMail = $("#sendSub");
  const caract = new RegExp(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/);
  function subscribe() {

    var to = $("#subscribe").val()
    if (to === "") {
      $('#sendSub').notify(
        "Please, introduce your email", {
          elementPosition: 'bottomleft'
        }
      );
    } else if(caract.test(to) == false) {
      $('#sendSub').notify(
        "Please, enter a correct email", {
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