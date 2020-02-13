const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geoCode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather Application",
    name: "Serhii"
  })
})

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About page",
    name: "Serhii"
  })
})

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help page",
    name: "Serhii"
  })
})

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "No such address"
    });
  }

  geoCode(req.query.address, (error, { latitude, longitude, location }={}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(
      latitude,
      longitude,
      (error, { temperature, summary, precipProbability }) => {
        if (error) {
          return res.send({ error });
        }
        return res.send({
          forecast: temperature,
          summary: summary,
          precipProbability: precipProbability,
          location,
          address: req.query.address
        });
      }
    );
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    message: "Help article was not found"
  })
})

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term"
    })
  }
  res.send({
    products: []
  })
})

app.get("*", (req, res) => {
  res.render("404", {
    message: "Page was not found"
  })
})

app.listen(4444, () => {
  console.log("Server port is up on port 4444.");
});
