import React from "react";
import AppBar from "./appbar/AppBar";
import NavDrawer from "./navdrawer/NavDrawer";
import NotesArea from "./mainarea/NotesArea";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import { handleAuthError, useQueryTodosAndLabels } from "../api";
import { Backdrop, CircularProgress } from "@material-ui/core";
import { useStoreActions } from "easy-peasy";

export default function ({ navigate }) {
    const result = useQueryTodosAndLabels();
    const setNotesItems = useStoreActions(actions => actions.notes.setNotesItems);
    const setLabelItems = useStoreActions(actions => actions.notes.setLabelItems);
    if (result.fetching) {
        return (
            <Backdrop open={true} >
                <CircularProgress color="inherit" />
            </ Backdrop>
        )
    } else if (result.error) {
        handleAuthError(result, navigate);
        return (<></>)
    } else {
        setNotesItems(result.data.todos);
        setLabelItems(result.data.labels);
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