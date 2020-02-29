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
    })
    return [isFetching, isSuccess, doLogin]
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
    useQueryTodosAndLabels
}