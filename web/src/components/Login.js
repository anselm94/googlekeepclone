import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import { Paper, TextField, Box, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "@reach/router";
import { useAppLogin } from "../api";
import Loading from "./Loading";

const useStyles = makeStyles(theme => ({
    pageWrapper: {
        height: "100vh",
        display: "flex",
        flexDirection: "column"
    },
    pageContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        flexGrow: "1"
    },
    boxWrapper: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    textWelcome: {
        ...theme.custom.fontFamily.metropolis
    },
    textRegister: {
        textDecoration: "none",
        color: theme.palette.secondary.dark
    },
    textRegisterText: {
        ...theme.custom.fontFamily.metropolis,
        paddingTop: theme.spacing(3)
    },
    textAttribution: {
        padding: theme.spacing(0, 2, 2, 0),
        textAlign: "right"
    },
    textCreator: {
        textDecoration: "none",
        color: theme.palette.secondary.dark
    },
    loginButtonRoot: {
        marginTop: theme.spacing(3)
    },
    loginButtonText: {
        ...theme.custom.fontFamily.metropolis,
        color: theme.palette.secondary.contrastText,
        textTransform: "capitalize"
    },
    logo: {
        height: theme.spacing(7),
        padding: theme.spacing(0, 0, 1, 0)
    },
    inputRoot: {
        '&$inputFocused $inputNotchedOutline': {
            borderColor: theme.palette.secondary.main
        },
    },
    inputNotchedOutline: {},
    inputFocused: {},
    inputLabelRoot: {
        '&$inputFocused': {
            color: theme.palette.secondary.main
        },
    }
}));

export default function ({ navigate }) {
    const classes = useStyles();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [attempted, setAttempted] = useState(false);
    const inputProps = {
        classes: {
            root: classes.inputRoot,
            notchedOutline: classes.inputNotchedOutline,
            focused: classes.inputFocused
        }
    }
    const inputLabelProps = {
        classes: {
            root: classes.inputLabelRoot,
            focused: classes.inputFocused
        }
    }
    const [isFetching, isSuccess, doLogin] = useAppLogin()
    const onLoginPress = () => {
        setAttempted(true)
        doLogin(email, password);
    }
    const onEmailChange = event => {
        setEmail(event.target.value);
    };
    const onPasswordChange = event => {
        setPassword(event.target.value);
    };
    if (isSuccess) {
        navigate("/");
        return (<></>)
    } else if (isFetching) {
        return (<Loading />)
    }
    return (
        <div className={classes.pageWrapper}>
            <Container maxWidth="xs" className={classes.pageContainer}>
                <Paper elevation={3}>
                    <Box className={classes.boxWrapper} p={3}>
                        <img className={classes.logo} src={`../logo.png`} alt={"logo"} />
                        <Typography className={classes.textWelcome} color="textSecondary" variant="subtitle1">Welcome back!</Typography>
                        <TextField error={!isSuccess && attempted && !isFetching} InputLabelProps={inputLabelProps} InputProps={inputProps} onChange={onEmailChange} label="Email" type="email" variant="outlined" fullWidth margin="normal" />
                        <TextField error={!isSuccess && attempted && !isFetching} InputLabelProps={inputLabelProps} InputProps={inputProps} onChange={onPasswordChange} label="Password" type="password" variant="outlined" fullWidth margin="normal" helperText={(!isSuccess && attempted) ? "Email or Password is wrong" : undefined} />
                        <Button classes={{ root: classes.loginButtonRoot, label: classes.loginButtonText }} disabled={isFetching || email === "" || password === ""} onClick={onLoginPress} variant="contained" color="secondary" disableElevation fullWidth size="large">Log In</Button>
                    </Box>
                </Paper>
                <Typography className={classes.textRegisterText} color="textSecondary" variant="body2">Don't have an account? <Link className={classes.textRegister} to="/register">Register</Link></Typography>
            </Container>
            <Typography className={classes.textAttribution} color="textSecondary" variant="body2">Created by <a className={classes.textCreator} href="https://github.com/anselm94">Merbin J Anselm</a></Typography>
        </div>
    )
}