const axios = require("axios");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const morgan = require("morgan");
const app = express();
const path = require("path");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

// all items are in mongodb now so make calls from there
const osge = mongoose.model("items", {
  id: Number,
  name: String
});

const base_url =
  "http://services.runescape.com/m=itemdb_oldschool/api/catalogue/detail.json?item=";
const connection = process.env.DATABASE;
mongoose.Promise = global.Promise;

app.post("/item", (req, res) => {
  const { search_item } = req.body;
  if (search_item === "") {
    res.status(404).json({ message: "Error: Item not found" });
  } else {
    osge
      .find({ name: { $regex: search_item, $options: "i" } })
      .then(data =>
        axios
          .get(base_url + data[0].id)
          .then(item => res.status(200).json(item.data))
      )
      .catch(err => {
        if (err) {
          res.status(404).json({ message: "Error: Item not found." });
        }
      });
  }
});

mongoose.connect(
  connection,
  { useNewUrlParser: true }
);
mongoose.connection.on("error", err =>
  console.log("Error connecting to MongoDB")
);

module.exports = app;
