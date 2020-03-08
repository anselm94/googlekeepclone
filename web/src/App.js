import React from "react";
import { Helmet } from "react-helmet";
import { Router } from "@reach/router";
import Main from "./components/Main";
import Login from "./components/Login";
import Register from "./components/Register";

export default function App() {
  return (
    <>
      <Helmet>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
        />
      </Helmet>
      <Router>
        <Main path="/" />
        <Login path="/login" />
        <Register path="/register" />
      </Router>
    </>
  );
}
