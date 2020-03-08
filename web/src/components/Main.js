import React, { useCallback } from "react";
import AppBar from "./appbar/AppBar";
import NavDrawer from "./navdrawer/NavDrawer";
import NotesArea from "./mainarea/NotesArea";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Loading from "./Loading";
import { useSubscription, useQuery } from "urql";
import { subscribeTodos, getTodosAndLabels, subscribeLabels } from "../gql";
import { TodosProvider, LabelsProvider, UiProvider, UserProvider, useUserStore } from "../store";
import { ThemeProvider, CssBaseline } from "@material-ui/core";
import { dark, light } from "../theme";

export default function ({ navigate }) {
    const [result] = useQuery({ query: getTodosAndLabels });
    if (result.fetching) {
        return (
            <Loading />
        )
    } else if (result.error) {
        if (result.error.message.includes("NotAuthenticated")) {
            navigate("/login")
        }
        return (<></>)
    } else if (result.data) {
        return (<MainComponent todosQ={result.data.todos} labelsQ={result.data.labels} userQ={result.data.user} />)
    }
}

function MainComponent({ todosQ, labelsQ, userQ }) {
    const handleSubscribeTodos = useCallback((todos = todosQ, data) => {
        if (!data || !data.todoStream) {
            return todos
        }
        return updateItemsReducer(todos, data.todoStream.todo, data.todoStream.action)
    }, [todosQ]);
    const handleSubscribeLabels = useCallback((labels = labelsQ, data) => {
        if (!data || !data.labelStream) {
            return labels
        }
        return updateItemsReducer(labels, data.labelStream.label, data.labelStream.action)
    }, [labelsQ]);
    const [todosResult] = useSubscription({ query: subscribeTodos }, handleSubscribeTodos)
    const [labelsResult] = useSubscription({ query: subscribeLabels }, handleSubscribeLabels)

    return (
        <>
            <TodosProvider todos={todosResult.data || todosQ}>
                <LabelsProvider labels={labelsResult.data || labelsQ}>
                    <UserProvider user={userQ}>
                        <UiProvider>
                            <ThemeControlledComponent />
                        </UiProvider>
                    </UserProvider>
                </LabelsProvider>
            </TodosProvider>
        </>
    )
}

function ThemeControlledComponent() {
    const [{ isDarkMode }] = useUserStore();
    return (
        <ThemeProvider theme={isDarkMode ? dark : light}>
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
    );
}

function updateItemsReducer(itemsArray, mutatedItem, action) {
    switch (action) {
        case "CREATED":
            itemsArray.push(mutatedItem)
            break;
        case "DELETED":
            const deleteIndex = itemsArray.findIndex((item) => item.id === mutatedItem.id);
            itemsArray.splice(deleteIndex, 1);
            break;
        case "UPDATED":
            const updateIndex = itemsArray.findIndex((item) => item.id === mutatedItem.id);
            itemsArray[updateIndex] = mutatedItem;
            break;
        default:
    }
    return Object.assign([], itemsArray);
}