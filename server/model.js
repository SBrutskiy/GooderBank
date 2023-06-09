const { MongoClient, ObjectId, ServerApiVersion } = require("mongodb");
require("dotenv/config");
// Connection URL
const url = process.env.DATABASE_URL || "mongodb://localhost:27017";
console.log(url);
// const client = new MongoClient(url);
const client = new MongoClient(url, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
// Database Name
const dbName = "myBank";

async function buildModel() {
  // Use connect method to connect to the server
  await client.connect();
  console.log(`Connected successfully to server`);
  const db = client.db(dbName);
  const users = db.collection("users");

  async function getAllUsers() {
    return await users.find({}).toArray();
  }

  async function handleLogin(userEmail, userPassword) {
    const loggedUser = await users.findOne({
      email: userEmail,
      password: userPassword,
    });
    return loggedUser;
  }

  async function getUserById(userId) {
    const user = await users.findOne(new ObjectId(userId));
    return user;
  }

  async function addUser(user) {
    const result = await users.insertOne(user);
    const newUser = await getUserById(result.insertedId);
    return newUser;
  }

  async function depositMoney(userId, depositAmount) {
    const user = await getUserById(userId);
    const newBalance = Number(user.balance) + Number(depositAmount);
    await users.updateOne(
      { _id: new ObjectId(userId) },
      { $set: { balance: newBalance } }
    );
  }

  async function withdrawMoney(userId, withdrawAmount) {
    const user = await getUserById(userId);
    const newBalance = Number(user.balance) - Number(withdrawAmount);
    await users.updateOne(
      { _id: new ObjectId(userId) },
      { $set: { balance: newBalance } }
    );
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
