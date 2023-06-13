import React from "react";
import { UserContext } from "./context";
import { Link } from "react-router-dom";

export function NavBar() {
  const ctx = React.useContext(UserContext);
  function logOut() {
    ctx.logOut();
  }
  if (!ctx.selectedUser) {
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="">
            Gooder Bank
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link
                  to="/CreateAccount"
                  title="Use this page to create an account"
                  className="nav-link"
                >
                  Create Account
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </>
    );
  } else
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="">
            Gooder Bank
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav" style={{ width: "100%" }}>
              <li className="nav-item">
                <Link
                  title="Use this page to create an account"
                  className="nav-link"
                  to="/CreateAccount"
                >
                  Create Account
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  title="Use this page to deposit money"
                  className="nav-link"
                  to="/deposit"
                >
                  Deposit
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  title="Use this page to withdraw money"
                  className="nav-link"
                  to="/withdraw"
                >
                  Withdraw
                </Link>
              </li>
              {/* <li className="nav-item">
              <Link
                title="Use this page to check balance"
                className="nav-link"
                to="/balance"
              >
                Balance
              </Link>
            </li> */}
              <li className="nav-item">
                <Link
                  title="Use this page to see all the accounts"
                  className="nav-link"
                  to="/alldata"
                >
                  AllData
                </Link>
              </li>
              <li
                className="navbar-brand mr-sm-2"
                style={{ marginLeft: "auto", marginRight: "10px" }}
              >
                Hello {ctx.selectedUser.name}
              </li>
              <button
                className=" btn btn-light"
                // style={{ marginLeft: "auto", marginRight: "2px" }}
                onClick={logOut}
              >
                logout
              </button>
            </ul>
          </div>
        </nav>
      </>
    );
}
