import React from "react";
import Container from "@material-ui/core/Container";
import { Paper, TextField, Box, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "@reach/router";

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
    textLogin: {
        textDecoration: "none",
        color: theme.palette.secondary.dark
    },
    textLoginText: {
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

export default function () {
    const classes = useStyles();
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
    return (
        <div className={classes.pageWrapper}>
            <Container maxWidth="xs" className={classes.pageContainer}>
                <Paper elevation={3}>
                    <Box className={classes.boxWrapper} p={3}>
                        <img className={classes.logo} src={`../logo.png`} alt={"logo"} />
                        <Typography className={classes.textWelcome} color="textSecondary" variant="subtitle1">Hello!</Typography>
                        <TextField InputLabelProps={inputLabelProps} InputProps={inputProps} label="Name" type="text" variant="outlined" fullWidth margin="normal" />
                        <TextField required InputLabelProps={inputLabelProps} InputProps={inputProps} label="Email" type="email" variant="outlined" helperText="Use any dummy email. I don't collect emails ;)" fullWidth margin="normal" />
                        <TextField required InputLabelProps={inputLabelProps} InputProps={inputProps} label="Password" type="password" variant="outlined" fullWidth margin="normal" />
                        <TextField required InputLabelProps={inputLabelProps} InputProps={inputProps} label="Confirm Password" type="password" variant="outlined" fullWidth margin="normal" />
                        <Button classes={{ root: classes.registerButtonRoot, label: classes.registerButtonText }} variant="contained" color="secondary" disableElevation fullWidth size="large">Register</Button>
                    </Box>
                </Paper>
                <Typography className={classes.textLoginText} color="textSecondary" variant="body2">Already have an account? <Link className={classes.textLogin} to="/login">Log In</Link></Typography>
            </Container>
            <Typography className={classes.textAttribution} color="textSecondary" variant="body2">Created by <a className={classes.textCreator} href="https://github.com/anselm94">Merbin J Anselm</a></Typography>
        </div>
    )
}