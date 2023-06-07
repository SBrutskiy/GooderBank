function Balance() {
  const ctx = React.useContext(UserContext);
  if (ctx.selectedUser == null) {
    return <div>You have to login</div>;
  }
  return <h1>Balance: {ctx.selectedUser.balance}</h1>;
}
