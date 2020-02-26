import React from "react";
import Container from "@material-ui/core/Container";
import { Paper, TextField, Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    pageContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh"
    },
    loginButton: {
        marginTop: theme.spacing(3)
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
        <>
            <Container maxWidth="xs" className={classes.pageContainer}>
                <Paper elevation={3}>
                    <Box p={3}>
                        <TextField InputLabelProps={inputLabelProps} InputProps={inputProps} label="Email" type="email" variant="outlined" fullWidth margin="normal" />
                        <TextField InputLabelProps={inputLabelProps} InputProps={inputProps} label="Password" type="password" variant="outlined" fullWidth margin="normal" />
                        <Button className={classes.loginButton} variant="contained" color="secondary" disableElevation fullWidth size="large">Log In</Button>
                    </Box>
                </Paper>
            </Container>
        </>
    )
}