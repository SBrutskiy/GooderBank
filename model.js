const users = [];
const { MongoClient } = require("mongodb");

// Connection URL
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

// Database Name
const dbName = "myBank";

async function buildModel() {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);

  function getAllUsers() {
    return users;
  }

  function handleLogin(userEmail, userPassword) {
    loggedUser = users.find(
      (user) => userEmail == user.email && user.password == userPassword
    );
    return loggedUser;
  }

  function getUserById(userId) {
    return users.find((user) => user.id === userId);
  }

  function addUser(user) {
    user.id = String(Date.now());
    users.push(user);
    return (newUser = users[users.length - 1]);
  }

  function depositMoney(userId, depositAmount) {
    const userIndex = users.findIndex((user) => user.id === userId);

    users[userIndex].balance += Number(depositAmount);
  }

  function withdrawMoney(userId, withdrawAmount) {
    const userIndex = users.findIndex((user) => user.id === userId);

    users[userIndex].balance -= Number(withdrawAmount);
  }
  return {
    getAllUsers,
    addUser,
    depositMoney,
    withdrawMoney,
    getUserById,
    handleLogin,
  };
}
module.exports = {
  buildModel,
};
