const weahterForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector(".first-message");
const messageTwo = document.querySelector(".second-message");

weahterForm.addEventListener("submit", event => {
  messageOne.textContent = 'Waiting for data';
  messageTwo.textContent = '';
  event.preventDefault();
  fetch(`http://localhost:4444/weather?address=${search.value}`)
  .then(res => res.json())
  .then(data => {
    if (data.error) {
      messageTwo.textContent = "Provide correct address!";
      messageOne.textContent = "";
    } else {
      messageOne.textContent = `${data.location}`;
      messageTwo.textContent = `${data.forecast}`;
    }
  });
})