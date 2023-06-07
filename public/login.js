function Login() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const ctx = React.useContext(UserContext);
  const hasAnyInput = password.length > 8 && email.length;

  function doLogin() {
    ctx.handleLogin({ email, password });
    setPassword("");
  }

  return (
    <Card
      bgcolor="primary"
      header="Log In"
      status={status}
      body={
        <>
          Email address
          <br />
          <input
            type="input"
            className="form-control"
            id="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
          <br />
          Password
          <br />
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
          <br />
          <button
            type="submit"
            className="btn btn-light"
            onClick={doLogin}
            disabled={!hasAnyInput}
          >
            Log In
          </button>
        </>
      }
    />
  );
}
depositMessage == false ? (
  <div className="card">
    <div className="card-body">
      <h5 className="card-title">Balance: {ctx.selectedUser.balance}</h5>

      <h5 className="card-title">Deposit</h5>
      <p className="card-text">To deposit funds type amount below and submit</p>
      <input
        type="text"
        placeholder="Deposit Amount"
        value={amount}
        onChange={() => setAmount(event.target.value)}
      />
      <button
        disabled={!hasInput}
        className="btn btn-primary"
        onClick={handleDeposit}
      >
        {" "}
        Deposit{" "}
      </button>
    </div>
  </div>
) : (
  <>
    <div className="alert alert-success" role="alert">
      Successfully deposited!
    </div>
    <button className="btn btn-primary" onClick={depositAgain}>
      {" "}
      Deposit More?{" "}
    </button>
  </>
);
