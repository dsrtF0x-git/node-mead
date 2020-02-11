const path = require("path");
const express = require("express");

const app = express();

const viewsPath = path.join(__dirname, "../templates");

app.set("view engine", "hbs");
app.set("views", viewsPath)

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
  res.send({
    forecast: 25,
    lcoation: "Konotop"
  });
});

app.listen(4444, () => {
  console.log("Server port is up on port 4444.");
});
