const express = require("express");
const app = express();
const cors = require("cors");
const { buildModel } = require("./model.js");

async function main() {
  const model = await buildModel();
  app.use(express.static("public"));
  app.use(cors());

  app.get("/account/create/:name/:email/:password", function (req, res) {
    newUser = model.addUser({
      name: req.params.name,
      email: req.params.email,
      password: req.params.password,
      balance: 100,
    });

    res.send(newUser);
  });

  app.get("/account/login/:email/:password", function (req, res) {
    const userEmail = req.params.email;
    const userPassword = req.params.password;

    res.send({ user: model.handleLogin(userEmail, userPassword) });
  });

  app.get("/account/getUser/:userId", function (req, res) {
    const userId = req.params.userId;

    res.send(model.getUserById(userId));
  });

  app.get("/account/deposit/:userId/:depositAmount", function (req, res) {
    const userId = req.params.userId;
    const depositAmount = req.params.depositAmount;
    model.depositMoney(userId, depositAmount);
    res.send(model.getUserById(userId));
  });

  app.get("/account/withdraw/:userId/:withdrawAmount", function (req, res) {
    const userId = req.params.userId;
    const withdrawAmount = req.params.withdrawAmount;
    model.withdrawMoney(userId, withdrawAmount);
    res.send(model.getUserById(userId));
  });

  app.get("/account/all", function (req, res) {
    model.getAllUsers();
  });

  const port = 3000;
  app.listen(port);
  console.log(`running on port: ${port}`);
}
main();
