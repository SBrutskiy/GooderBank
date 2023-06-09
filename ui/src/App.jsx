import React from "react";
import { Home } from "./home";
import { CreateAccount } from "./createaccount";
import { Login } from "./login";
import { Deposit } from "./deposit";
import { Withdraw } from "./withdraw";
import { Balance } from "./balance";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  useLocation,
} from "react-router-dom";
import { UserContext } from "./context";
import { NavBar } from "./navbar";

function NoMatch() {
  const location = useLocation();

  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
}

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
        const res = await fetch(`/api/account/getUser/${userId}`);
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
  //     const res = await fetch("/api/account/all");
  //     const data = await res.json();

  //     setAllUsers(data);
  //   }
  //   getData();
  // }, []);

  async function handleAddUser(user) {
    const res = await fetch(
      `/api/account/create/${user.name}/${user.email}/${user.password}`
    );
    const data = await res.json();

    setSelectedUser(data);
  }

  async function handleLogin(user) {
    const res = await fetch(
      `/api/account/login/${user.email}/${user.password}`
    );
    const data = await res.json();
    if (data.user) {
      return setSelectedUser(data.user);
    } else return alert("username or password are incorrect ");
  }
  async function handleDeposit(depositAmount) {
    const res = await fetch(
      `/api/account/deposit/${selectedUser._id}/${depositAmount}/`
    );
    const data = await res.json();
    setSelectedUser(data);
  }

  async function handleWithdraw(withdrawAmount) {
    const res = await fetch(
      `/api/account/withdraw/${selectedUser._id}/${withdrawAmount}/`
    );
    const data = await res.json();
    setSelectedUser(data);
  }

  return (
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
      <Router>
        <NavBar />
        <div className="container" style={{ padding: "20px" }}>
          <Switch>
            {/* <Route path="/CreateAccount">
              <CreateAccount />
            </Route> */}
            <Route path="/CreateAccount" component={CreateAccount} />
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/deposit">
              <Deposit />
            </Route>
            <Route path="/withdraw">
              <Withdraw />
            </Route>
            <Route path="/balance">
              <Balance />
            </Route>
            {/* <Route   path="/alldata" > <AllData /> */}
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="*">
              <NoMatch />
            </Route>
          </Switch>
        </div>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
