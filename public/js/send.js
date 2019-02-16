$(document).ready(() => {
  
  const sendPol = $("#sendpolitics")
  function sendPolitic(){  
    $("#sendpolitics").notify(
      "We have sent your invoice", "success",
      { elementPosition: 'topleft'}
    );
       axios.post(`/experiences/send`, { method: "post", withCredentials: true })
         .then(response => {
         
         })
         .catch(error => console.error(error));
   };
  
  sendPol.click(sendPolitic)
  })  