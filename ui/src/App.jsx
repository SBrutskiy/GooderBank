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
const apiHost = import.meta.env.VITE_API_ORIGIN || "";
async function fetchHelper(path) {
  const res = await fetch(`${apiHost}${path}`);
  console.log({ apiHost });
  const data = await res.json();
  return data;
}

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
        const data = await fetchHelper(`/api/account/getUser/${userId}`);
        if (data && data._id) {
          setSelectedUser(data);
        } else {
          localStorage.removeItem("userId");
        }
      }
    }
    getUser();
  }, []);

  async function handleAddUser(user) {
    const data = await fetchHelper(
      `/api/account/create/${user.name}/${user.email}/${user.password}`
    );

    setSelectedUser(data);
  }

  async function handleLogin(user) {
    const data = await fetchHelper(
      `/api/account/login/${user.email}/${user.password}`
    );
    if (data.user) {
      return setSelectedUser(data.user);
    } else return alert("username or password are incorrect ");
  }
  async function handleDeposit(depositAmount) {
    const data = await fetchHelper(
      `/api/account/deposit/${selectedUser._id}/${depositAmount}/`
    );
    setSelectedUser(data);
  }

  async function handleWithdraw(withdrawAmount) {
    const data = await fetchHelper(
      `/api/account/withdraw/${selectedUser._id}/${withdrawAmount}/`
    );
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
