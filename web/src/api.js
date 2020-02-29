import gql from 'graphql-tag';
import { useQuery } from 'urql';
import { useCallback, useState } from 'react';
import axios from "axios";

const getTodos = gql`
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
    }
`

const handleError = (queryResult, routerNavigateFn) => {
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

const useQueryTodos = () => {
    const [result] = useQuery({
        query: getTodos,
    });
    return result;
}

export {
    handleError,
    useAppLogin,
    useQueryTodos
}