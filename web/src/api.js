import { useCallback, useState } from 'react';
import axios from "axios";


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

export {
    useAppLogin,
    useAppLogout,
    useAppRegister
}