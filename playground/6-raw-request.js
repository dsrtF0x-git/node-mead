const https = require("https");

const url = `https://api.darksky.net/forecast/d6423f7bbdfbcf0d85cef39f0d7ba5bf/50.3453,-51.4532?units=si`;

const request = https.request(url, response => {

  let data = '';
  response.on("data", chunk => {
    data = data + chunk.toString()
    // console.log(chunk)
  })

  response.on("end", () => {
    console.log(JSON.parse(data).currently)
  })
})

request.on("error", error => {
  console.log(error);
})

request.end()