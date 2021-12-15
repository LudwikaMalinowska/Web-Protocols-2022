window.addEventListener("load", function (event) { 
 const es = new EventSource("http://localhost:7000/events/datetime");
 const adv_es = new EventSource("http://localhost:7000/events/advertisement");
 
 adv_es.addEventListener("message", function(event){
    const adv = document.getElementById("adv")
    
     adv.textContent = event.data;
 })


 es.addEventListener("message", function(event) {
  const newElement = document.createElement("li");
  const eventList = document.getElementById("list");

  newElement.textContent = event.data;
  eventList.appendChild(newElement);
 });

 
 
});
