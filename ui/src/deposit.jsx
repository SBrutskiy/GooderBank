import React from "react";
import { UserContext } from "./context";

export function Deposit() {
  const ctx = React.useContext(UserContext);
  const [amount, setAmount] = React.useState(0);
  const [depositMessage, setDepositMessage] = React.useState(false);
  const hasInput = amount.length;

  if (ctx.selectedUser == null) {
    return <div>You have to login</div>;
  }
  function depositAgain() {
    setDepositMessage(false);
  }

  function handleDeposit() {
    if (isNaN(amount)) {
      alert(`${amount} is not number, please type a number`);
      setWithdrawAmount(0);
      return;
    }
    if (amount < 0) {
      alert(
        `${amount} is a negative number, please use withdraw page if you wish to withdraw money.`
      );
      setWithdrawAmount(0);
      return;
    }
    ctx.handleDeposit(amount);
    setAmount(0);
    setDepositMessage(true);
  }

  return depositMessage == false ? (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Balance: {ctx.selectedUser.balance}</h5>

        <h5 className="card-title">Deposit</h5>
        <p className="card-text">
          To deposit funds type amount below and submit
        </p>
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
}
