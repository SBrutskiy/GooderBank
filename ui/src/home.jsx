import React from "react";
import { Card } from "./context";

export function Home() {
  return (
    <Card
      txtcolor="black"
      header="The Gooder Bank"
      title="Welcome to the bank"
      text="You can move around using the navigation bar."
      body={
        <img src="./bank.png" className="img-fluid" alt="Responsive image" />
      }
    />
  );
}
