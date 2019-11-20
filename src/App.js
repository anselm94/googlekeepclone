import React from "react";
import { Helmet } from "react-helmet";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import theme from "./theme";
import AppBar from "./components/appbar/AppBar";
import NavDrawer from "./components/navdrawer/NavDrawer";
import NotesArea from "./components/mainarea/NotesArea";

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
        <AppBar />
        <NavDrawer />
        <Container maxWidth={false}>
          <Box mt={8}>
            <NotesArea />
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}
