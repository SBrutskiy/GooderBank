import React from "react";
import { Card } from "./context";
import bank from "./assets/bank.png";
export function Home() {
  return (
    <Card
      txtcolor="black"
      header="The Gooder Bank"
      title="Welcome to the bank"
      text="You can move around using the navigation bar."
      body={<img src={bank} className="img-fluid" />}
    />
  );
}
