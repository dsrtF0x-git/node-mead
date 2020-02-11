const forecast = require("./utils/forecast");
const geoCode = require("./utils/geocode");

if (!process.argv[2]) {
  return console.log("Please, provide location")
}

geoCode(process.argv[2], (error, { latitude, longitude, location }) => {
  if (error) {
    return console.log(error);
  }
  forecast(latitude, longitude, (error, forecastData) => {
    if (error) {
      return console.log(error);
    }
    console.log(location, forecastData)
  });
})