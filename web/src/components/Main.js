import React from "react";
import AppBar from "./appbar/AppBar";
import NavDrawer from "./navdrawer/NavDrawer";
import NotesArea from "./mainarea/NotesArea";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import { handleAuthError, useQueryTodosAndLabels, useSubscribeLabels, useSubscribeTodos } from "../api";
import { Backdrop, CircularProgress } from "@material-ui/core";
import { useStoreActions } from "easy-peasy";

export default function ({ navigate }) {
    const result = useQueryTodosAndLabels();
    const setNotesItems = useStoreActions(actions => actions.notes.setNotesItems);
    const setLabelItems = useStoreActions(actions => actions.notes.setLabelItems);
    const setNameAndEmail = useStoreActions(actions => actions.user.setNameAndEmail);
    const setSettings = useStoreActions(actions => actions.ui.setSettings);
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
        setNameAndEmail(result.data.user);
        setSettings(result.data.user);
        return (<MainComponent />)
    }
}

function MainComponent() {
    const addNoteItem = useStoreActions(actions => actions.notes.addNoteItem);
    const deleteNoteItem = useStoreActions(actions => actions.notes.deleteNoteItem);
    const updateNoteItem = useStoreActions(actions => actions.notes.updateNoteItem);
    const addLabelItem = useStoreActions(actions => actions.notes.addLabelItem);
    const deleteLabelItem = useStoreActions(actions => actions.notes.deleteLabelItem);
    const updateLabelItem = useStoreActions(actions => actions.notes.updateLabelItem);
    useSubscribeTodos(addNoteItem, deleteNoteItem, updateNoteItem);
    useSubscribeLabels(addLabelItem, deleteLabelItem, updateLabelItem);
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