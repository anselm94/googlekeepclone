import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Router } from "@reach/router";
import CssBaseline from "@material-ui/core/CssBaseline";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import theme from "./theme";
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
      <ThemeProvider theme={theme}>
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
