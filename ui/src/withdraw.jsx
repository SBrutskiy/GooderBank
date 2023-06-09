import React from "react";
import { UserContext } from "./context";

export function Withdraw() {
  const ctx = React.useContext(UserContext);
  const [withdrawAmount, setWithdrawAmount] = React.useState(0);
  const [thxsMessage, setThxsMessage] = React.useState(false);
  const hasInput = withdrawAmount.length;

  if (ctx.selectedUser == null) {
    return <div>You have to login</div>;
  }
  function withDrawAgain() {
    setThxsMessage(false);
  }
  function handleWithdraw() {
    const oldBalance = ctx.selectedUser.balance;
    if (isNaN(withdrawAmount)) {
      alert(`${withdrawAmount} is not number, please type a number`);
      setWithdrawAmount(0);
      return;
    } else if (oldBalance >= withdrawAmount) {
      ctx.handleWithdraw(withdrawAmount);
      setWithdrawAmount(0);
      setThxsMessage(true);
    } else {
      alert("Insufficient Funds.");
      setWithdrawAmount(0);
      return;
    }
  }
  return thxsMessage == false ? (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Balance: {ctx.selectedUser.balance}</h5>

        <h5 className="card-title">Withdraw</h5>
        <p className="card-text">
          To withdraw funds type amount below and submit
        </p>
        <input
          type="text"
          placeholder="Deposit Amount"
          value={withdrawAmount}
          onChange={() => setWithdrawAmount(event.target.value)}
        />
        <button
          disabled={!hasInput}
          className="btn btn-primary"
          onClick={handleWithdraw}
        >
          {" "}
          Submit{" "}
        </button>
      </div>
    </div>
  ) : (
    <>
      <div className="alert alert-success" role="alert">
        Successfully withdrawn!
      </div>
      <button className="btn btn-primary" onClick={withDrawAgain}>
        {" "}
        WithDraw More?{" "}
      </button>
    </>
  );
}
