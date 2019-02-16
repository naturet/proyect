$(document).ready(() => {

  const sendMail = $("#sendSub"); 
  function subscribe(){      
        var to=$("#subscribe").val()     
        axios.post(`/subscribe`, {to:to, method: "post", withCredentials: true })
          .then(response => {
          })
          .catch(error => console.error(error));
    }
  sendMail.click(subscribe)
  })