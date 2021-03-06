const weahterForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector(".first-message");
const messageTwo = document.querySelector(".second-message");

search.addEventListener("input", event => {
  if (event.target.value.match(/\w/g)) {
    event.target.value = event.target.value.match(/\w/g).join('');
  } else {
    event.target.value = '';
  }
});

weahterForm.addEventListener("submit", event => {
  messageOne.textContent = 'Waiting for data';
  messageTwo.textContent = '';
  event.preventDefault();
  fetch(`/weather?address=${search.value}`)
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