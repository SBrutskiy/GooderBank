const express = require("express");
const app = express();
const cors = require("cors");
const { buildModel } = require("./model.js");

async function main() {
  const model = await buildModel();
  app.use(cors());

  app.get("/account/create/:name/:email/:password", async function (req, res) {
    const newUser = await model.addUser({
      name: req.params.name,
      email: req.params.email,
      password: req.params.password,
      balance: 100,
    });

    res.send(newUser);
  });

  app.get("/account/login/:email/:password", async function (req, res) {
    const userEmail = req.params.email;
    const userPassword = req.params.password;

    res.send({ user: await model.handleLogin(userEmail, userPassword) });
  });

  app.get("/account/getUser/:userId", async function (req, res) {
    const userId = req.params.userId;
    const user = await model.getUserById(userId);
    res.send(user);
  });

  app.get("/account/deposit/:userId/:depositAmount", async function (req, res) {
    const userId = req.params.userId;
    const depositAmount = req.params.depositAmount;
    await model.depositMoney(userId, depositAmount);
    res.send(await model.getUserById(userId));
  });

  app.get(
    "/account/withdraw/:userId/:withdrawAmount",
    async function (req, res) {
      const userId = req.params.userId;
      const withdrawAmount = req.params.withdrawAmount;
      await model.withdrawMoney(userId, withdrawAmount);
      const user = await model.getUserById(userId);
      res.send(user);
    }
  );

  app.get("/account/all", async function (req, res) {
    res.send(await model.getAllUsers());
  });

  const port = 3000;
  app.listen(port);
  console.log(`running on port: ${port}`);
}
main();
