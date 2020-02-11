const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/d6423f7bbdfbcf0d85cef39f0d7ba5bf/${longitude},${latitude}?units=si`;

  request({
    url, json: true
  }, (error, { body }) => {
    if (error) {
      callback("Something went wrong.")
    } else if (body.error) {
      callback("Wrong coordinates")
    } else {
      callback(undefined, {
        summary: body.daily.data[0].summary,
        temperature: body.currently.temperature,
        precipProbability: body.currently.precipProbability
      })
    }
  })
}

module.exports = forecast;