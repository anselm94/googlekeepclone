import gql from 'graphql-tag';
import { useQuery, useSubscription } from 'urql';
import { useCallback, useState } from 'react';
import axios from "axios";

const getTodosAndLabels = gql`
    query GetTodos{
        todos {
            id
            title
            notes {
                text
                isCompleted
            }
            labels {
                id
                name
            }
            color
            isCheckboxMode
        }
        labels {
            id
            name
        }
        user {
            name
            email
            listMode
            darkMode
        }
    }
`

const subscribeTodos = gql`
    subscription SubcribeTodos{
        todoStream {
            action
            todo {
            id
            title
            notes {
                text
                isCompleted
            }
            labels {
                id
                name
            }
            color
            isCheckboxMode
            }
        }
    }
`

const subscribeLabels = gql`
    subscription SubcribeLabels{
        labelStream {
            action
            label {
                id
                name
            }
        }
    }
`


const handleAuthError = (queryResult, routerNavigateFn) => {
    if (queryResult.error) {
        if (queryResult.error.message.includes("NotAuthenticated")) {
            routerNavigateFn("/login")
        }
    }
}

const useAppLogin = () => {
    const [isFetching, setIsFetching] = useState(false)
    const [isSuccess, setSuccess] = useState(false);
    const doLogin = useCallback(async (email, password) => {
        setIsFetching(true);
        const success = await axios.post("/auth/login", {
            email,
            password
        }).then((data) => {
            return data.data.status === "success"
        })
        setSuccess(success)
        setIsFetching(false)
    }, [setSuccess, setIsFetching])
    return [isFetching, isSuccess, doLogin]
}

const useAppLogout = () => {
    const [isFetching, setIsFetching] = useState(false)
    const [isSuccess, setSuccess] = useState(false);
    const doLogout = useCallback(async () => {
        setIsFetching(true);
        const success = await axios.post("/auth/logout", {}).then((data) => {
            return data.data.status === "success"
        })
        setSuccess(success)
        setIsFetching(false)
    }, [setSuccess, setIsFetching])
    return [isFetching, isSuccess, doLogout]
}

const useAppRegister = () => {
    const [isFetching, setIsFetching] = useState(false)
    const [isSuccess, setSuccess] = useState(false);
    const doRegister = useCallback(async (name, email, password) => {
        setIsFetching(true);
        const success = await axios.post("/auth/register", {
            name,
            email,
            password
        }).then((data) => {
            return data.data.status === "success"
        })
        setSuccess(success)
        setIsFetching(false)
    }, [setSuccess, setIsFetching])
    return [isFetching, isSuccess, doRegister]
}

const useQueryTodosAndLabels = () => {
    const [result] = useQuery({
        query: getTodosAndLabels,
    });
    return result;
}

const useSubscribeTodos = (todoAddedFn, todoDeletedFn, todoUpdatedFn) => {
    const subscriptionCallback = useCallback((_, data) => {
        if (!data.todoStream) {
            return
        }
        const todoItem = data.todoStream.todo;
        switch (data.todoStream.action) {
            case "CREATED":
                todoAddedFn(todoItem);
                break;
            case "DELETED":
                todoDeletedFn(todoItem);
                break;
            case "UPDATED":
                todoUpdatedFn(todoItem);
                break;
            default:
        }
    }, [todoAddedFn, todoDeletedFn, todoUpdatedFn]);
    const [result] = useSubscription({
        query: subscribeTodos,
    }, subscriptionCallback);
    return result;
}

const useSubscribeLabels = (labelAddedFn, labelDeletedFn, labelUpdatedFn) => {
    const subscriptionCallback = useCallback((_, data) => {
        if (!data.labelStream) {
            return
        }
        const labelItem = data.labelStream.todo;
        switch (data.labelStream.action) {
            case "CREATED":
                labelAddedFn(labelItem);
                break;
            case "DELETED":
                labelDeletedFn(labelItem);
                break;
            case "UPDATED":
                labelUpdatedFn(labelItem);
                break;
            default:
        }
    }, [labelAddedFn, labelDeletedFn, labelUpdatedFn]);
    const [result] = useSubscription({
        query: subscribeLabels,
    }, subscriptionCallback);
    return result;
}

export {
    handleAuthError,
    useAppLogin,
    useAppLogout,
    useAppRegister,
    useQueryTodosAndLabels,
    useSubscribeTodos,
    useSubscribeLabels
}