import React from "react";
import { Home } from "./home";
import { CreateAccount } from "./createaccount";
import { Login } from "./login";
import { Deposit } from "./deposit";
import { Withdraw } from "./withdraw";
import { Balance } from "./balance";
import { HashRouter, Route } from "react-router-dom";
import { UserContext } from "./context";
import { NavBar } from "./navbar";

function App() {
  const [selectedUserIndex, setSelectedUserIndex] = React.useState(null);
  const [allUsers, setAllUsers] = React.useState([]);
  const [transactions, setTransactions] = React.useState([]);
  const [selectedUser, setSelectedUser] = React.useState(null);

  React.useEffect(() => {
    if (selectedUser) {
      localStorage.setItem("userId", selectedUser._id);
    }
  }, [selectedUser]);

  React.useEffect(() => {
    async function getUser() {
      const userId = localStorage.getItem("userId");
      if (userId) {
        const res = await fetch(`/account/getUser/${userId}`);
        const data = await res.json();
        if (data && data._id) {
          setSelectedUser(data);
        } else {
          localStorage.removeItem("userId");
        }
      }
    }
    getUser();
  }, []);

  // React.useEffect(() => {
  //   async function getData() {
  //     const res = await fetch("/account/all");
  //     const data = await res.json();

  //     setAllUsers(data);
  //   }
  //   getData();
  // }, []);

  async function handleAddUser(user) {
    const res = await fetch(
      `/account/create/${user.name}/${user.email}/${user.password}`
    );
    const data = await res.json();

    setSelectedUser(data);
  }

  async function handleLogin(user) {
    const res = await fetch(`/account/login/${user.email}/${user.password}`);
    const data = await res.json();
    if (data.user) {
      return setSelectedUser(data.user);
    } else return alert("username or password are incorrect ");
  }
  async function handleDeposit(depositAmount) {
    const res = await fetch(
      `/account/deposit/${selectedUser._id}/${depositAmount}/`
    );
    const data = await res.json();
    setSelectedUser(data);
  }

  async function handleWithdraw(withdrawAmount) {
    const res = await fetch(
      `/account/withdraw/${selectedUser._id}/${withdrawAmount}/`
    );
    const data = await res.json();
    setSelectedUser(data);
  }

  return (
    <HashRouter>
      <UserContext.Provider
        value={{
          transactions: transactions,
          // users: allUsers,
          selectedUser,
          handleAddUser,
          handleDeposit,
          handleWithdraw,
          handleLogin,
        }}
      >
        <NavBar />
        <div className="container" style={{ padding: "20px" }}>
          <Route path="/" exact component={Home} />
          <Route path="/CreateAccount/" component={CreateAccount} />
          <Route path="/login/" component={Login} />
          <Route path="/deposit/" component={Deposit} />
          <Route path="/withdraw/" component={Withdraw} />
          <Route path="/balance/" component={Balance} />
          {/* <Route path="/alldata/" component={AllData} /> */}
        </div>
      </UserContext.Provider>
    </HashRouter>
  );
}

export default App;
