import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import { Paper, TextField, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "@reach/router";
import Loading from "./Loading";
import useAxios from "axios-hooks";

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
        padding: theme.spacing(3)
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
    textNotice: {
        ...theme.custom.fontFamily.roboto,
        lineHeight: "unset",
        textAlign: "center",
        paddingTop: theme.spacing(2)
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
    const [{ data: result = {}, loading }, doLogin] = useAxios({
        url: "/auth/login",
        method: "POST",
        data: {
            email, password
        }
    }, { manual: true });
    const onLoginClick = (event) => {
        event.preventDefault();
        doLogin();
    }
    if (result.status === "success") {
        navigate("/");
        return (<></>)
    } else if (loading) {
        return (<Loading />)
    }
    return (
        <div className={classes.pageWrapper}>
            <Container maxWidth="md" className={classes.pageContainer}>
                <Paper elevation={3}>
                    <form className={classes.boxWrapper} onSubmit={onLoginClick}>
                        <img className={classes.logo} src={`../logo.png`} alt={"logo"} />
                        <Typography className={classes.textWelcome} color="textSecondary" variant="subtitle1">Welcome back!</Typography>
                        <TextField error={result.status === "failure"} InputLabelProps={inputLabelProps} InputProps={inputProps} name="email" onChange={event => setEmail(event.target.value)} label="Email" type="email" variant="outlined" fullWidth margin="normal" />
                        <TextField error={result.status === "failure"} InputLabelProps={inputLabelProps} InputProps={inputProps} name="password" onChange={event => setPassword(event.target.value)} label="Password" type="password" variant="outlined" fullWidth margin="normal" helperText={result.error} />
                        <Button classes={{ root: classes.loginButtonRoot, label: classes.loginButtonText }} type="submit" disabled={loading || email === "" || password === ""} variant="contained" color="secondary" disableElevation fullWidth size="large">Log In</Button>
                        <Typography className={classes.textNotice} color="textSecondary" variant="caption">Your user login &amp; data will be deleted<br />on container restart, and happens so<br />often as I'm running this on Free Tier<br /></Typography>
                    </form>
                </Paper>
                <Typography className={classes.textRegisterText} color="textSecondary" variant="body2">Don't have an account? <Link className={classes.textRegister} to="/register">Register</Link></Typography>
            </Container>
            <Typography className={classes.textAttribution} color="textSecondary" variant="body2">Created by <a className={classes.textCreator} href="https://github.com/anselm94">Merbin J Anselm</a></Typography>
        </div>
    )
}