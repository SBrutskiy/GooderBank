const users = [];

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

module.exports = {
  getAllUsers,
  addUser,
  depositMoney,
  withdrawMoney,
  getUserById,
  handleLogin,
};
