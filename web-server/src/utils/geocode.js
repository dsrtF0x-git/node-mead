const request = require("request");

const geoCode = (address, callback) => {
  const geoCoord = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?&access_token=pk.eyJ1IjoiZHNydGYweCIsImEiOiJjazZnN3Bjc2Ywamk5M3BvanNkeDJpZG9pIn0.JR5tUjElqa8SM_nw_oaj7A`;

  request({ url: geoCoord, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services.")
    } else if (body.features.length === 0) {
      callback("Unable to find location.")
    } else {
      callback(undefined, {
        latitude: body.features[0].center[0],
        longitude: body.features[0].center[1],
        location: body.features[0].place_name
      })
    }
  });
}

module.exports = geoCode;