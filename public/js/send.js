$(document).ready(() => {

  const sendPol = $("#sendpolitics")
  function sendPolitic(){  
       axios.post(`/experiences/send`, { method: "post", withCredentials: true })
         .then(response => {
         })
         .catch(error => console.error(error));
   };
  
  sendPol.click(sendPolitic)
  })    