import gql from 'graphql-tag';
import { useQuery } from 'urql';
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

export {
    handleAuthError,
    useAppLogin,
    useAppLogout,
    useAppRegister,
    useQueryTodosAndLabels
}