import React from "react";
import { Helmet } from "react-helmet";
import { Router } from "@reach/router";
import Main from "./components/Main";
import Login from "./components/Login";
import Register from "./components/Register";
import { light } from "./theme";
import { ThemeProvider, CssBaseline } from "@material-ui/core";

export default function App() {
  return (
    <>
      <Helmet>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
        />
      </Helmet>
      <ThemeProvider theme={light}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Router>
          <Main path="/" />
          <Login path="/login" />
          <Register path="/register" />
        </Router>
      </ThemeProvider>
    </>
  );
}
