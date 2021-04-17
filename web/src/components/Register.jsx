import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import { Paper, TextField, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "@reach/router";
import useAxios from "axios-hooks";
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
        padding: theme.spacing(3)
    },
    textWelcome: {
        ...theme.custom.fontFamily.metropolis
    },
    textLogin: {
        textDecoration: "none",
        color: theme.palette.secondary.dark
    },
    textLoginText: {
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
    registerButtonRoot: {
        marginTop: theme.spacing(3)
    },
    registerButtonText: {
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
    const [name, setName] = useState("");
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
    const [{ data: result = {}, loading }, doRegister] = useAxios({
        url: "/auth/register",
        method: "POST",
        data: {
            name, email, password
        }
    }, { manual: true });
    const onRegisterClick = (event) => {
        event.preventDefault();
        doRegister();
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
                    <form className={classes.boxWrapper} onSubmit={onRegisterClick}>
                        <img className={classes.logo} src={`../logo.png`} alt={"logo"} />
                        <Typography className={classes.textWelcome} color="textSecondary" variant="subtitle1">Hello!</Typography>
                        <TextField required InputLabelProps={inputLabelProps} InputProps={inputProps} name="name" label="Name" type="text" variant="outlined" value={name} onChange={event => setName(event.target.value)} error={result.status === "failure"} helperText={result.errors && result.errors["name"] && result.errors["name"][0]} fullWidth margin="normal" />
                        <TextField required InputLabelProps={inputLabelProps} InputProps={inputProps} name="email" label="Email" type="email" variant="outlined" value={email} error={result.status === "failure"} helperText={(result.errors && ((result.errors["email"] && result.errors["email"][0]) || (result.errors[""] && result.errors[""][0]))) || "Use any dummy email. I don't collect emails ;)"} onChange={event => setEmail(event.target.value)} fullWidth margin="normal" />
                        <TextField required InputLabelProps={inputLabelProps} InputProps={inputProps} name="password" label="Password" type="password" variant="outlined" value={password} error={result.status === "failure"} helperText={result.errors && result.errors["password"] && result.errors["password"][0]} onChange={event => setPassword(event.target.value)} fullWidth margin="normal" />
                        <Button classes={{ root: classes.registerButtonRoot, label: classes.registerButtonText }} type="submit" disabled={email === "" || password === ""} variant="contained" color="secondary" disableElevation fullWidth size="large">Register</Button>
                        <Typography className={classes.textNotice} color="textSecondary" variant="caption">Your user login &amp; data will be deleted<br />on container restart, and happens so<br />often as I'm running this on Free Tier<br /></Typography>
                    </form>
                </Paper>
                <Typography className={classes.textLoginText} color="textSecondary" variant="body2">Already have an account? <Link className={classes.textLogin} to="/login">Log In</Link></Typography>
            </Container>
            <Typography className={classes.textAttribution} color="textSecondary" variant="body2">Created by <a className={classes.textCreator} href="https://github.com/anselm94">Merbin J Anselm</a></Typography>
        </div>
    )
}