import React from "react";
import AppBar from "./appbar/AppBar";
import NavDrawer from "./navdrawer/NavDrawer";
import NotesArea from "./mainarea/NotesArea";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";

export default function () {
    return (
        <>
            <AppBar />
            <NavDrawer />
            <Container maxWidth={false}>
                <Box mt={8}>
                    <NotesArea />
                </Box>
            </Container>
        </>
    )
}