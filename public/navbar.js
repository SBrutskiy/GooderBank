function NavBar() {
  const ctx = React.useContext(UserContext);
  if (!ctx.selectedUser) {
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="#">
            Gooder Bank
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a
                  title="Use this page to create an account"
                  className="nav-link"
                  href="#/CreateAccount/"
                >
                  Create Account
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#/login/">
                  Login
                </a>
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
          <a className="navbar-brand" href="#">
            Gooder Bank
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a
                  title="Use this page to create an account"
                  className="nav-link"
                  href="#/CreateAccount/"
                >
                  Create Account
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#/login/">
                  Login
                </a>
              </li>
              <li className="nav-item">
                <a
                  title="Use this page to deposit money"
                  className="nav-link"
                  href="#/deposit/"
                >
                  Deposit
                </a>
              </li>
              <li className="nav-item">
                <a
                  title="Use this page to withdraw money"
                  className="nav-link"
                  href="#/withdraw/"
                >
                  Withdraw
                </a>
              </li>
              {/* <li className="nav-item">
              <a
                title="Use this page to check balance"
                className="nav-link"
                href="#/balance/"
              >
                Balance
              </a>
            </li> */}
              <li className="nav-item">
                <a
                  title="Use this page to see all the accounts"
                  className="nav-link"
                  href="#/alldata/"
                >
                  AllData
                </a>
              </li>
              <li className="nav-item">Hello {ctx.selectedUser.name}</li>
            </ul>
          </div>
        </nav>
      </>
    );
}
