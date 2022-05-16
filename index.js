const express = require("express");
const EventEmitter = require("events");
const { createUser, getUsers } = require("./users_model");
const cors = require("cors");
const PORT = 5000;

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  getUsers()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.post("/user", (req, res) => {
  createUser(req.body);
  res.send();
});

app.listen(PORT, () => {
  console.log("Сервер запущен на порту " + PORT);
});
