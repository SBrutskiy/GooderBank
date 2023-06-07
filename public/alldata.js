function AllData() {
  const ctx = React.useContext(UserContext);
  // if (ctx.selectedUser == null) {
  //   return <div>Please log in</div>;
  // } else
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Accounts and Balances</h5>

        {ctx.users.map((result, i) => (
          <div key={i} id={i} className="card-text">
            name: {result.name}
          </div>
        ))}

        <h5 className="card-title">History:</h5>

        {ctx.transactions.map((result, i) => (
          <div key={i} id={i} className="card-text">
            old balance: {result.oldBalance} new balance: {result.newBalance}
          </div>
        ))}
      </div>
    </div>
  );
}
