import React from "react";
import AppBar from "./appbar/AppBar";
import NavDrawer from "./navdrawer/NavDrawer";
import NotesArea from "./mainarea/NotesArea";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import { handleError, useQueryTodos } from "../api";
import { Backdrop, CircularProgress } from "@material-ui/core";
import { useStoreActions } from "easy-peasy";

export default function ({ navigate }) {
    const result = useQueryTodos();
    if (result.fetching) {
        return (
            <Backdrop open={true} >
                <CircularProgress color="inherit" />
            </ Backdrop>
        )
    } else if (result.error) {
        handleError(result, navigate);
        return (<></>)
    } else {
        const setNotesItems = useStoreActions(actions => actions.notes.setNotesItems);
        setNotesItems(result.data.todos);
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
}