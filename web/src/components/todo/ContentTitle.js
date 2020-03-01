import React from "react";
import { makeStyles } from "@material-ui/styles";
import { InputBase, Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  inputTitleRoot: {
    ...theme.custom.fontFamily.metropolis,
    padding: theme.spacing(1.5, 2, 0, 2)
  },
  inputTitleInput: {
    fontWeight: 500,
    fontSize: "1rem",
    padding: 0,
    lineHeight: theme.spacing(0.18),
    verticalAlign: "middle",
    color: theme.palette.text.primary
  },
  textTitle: {
    ...theme.custom.fontFamily.metropolis,
    padding: theme.spacing(1.5, 2, 0, 2),
    fontWeight: 500,
    fontSize: "1rem",
    color: theme.palette.text.primary,
    lineHeight: theme.spacing(0.18),
    display: "flex",
    flexWrap: "wrap"
  }
}));

export default function ({ title, setTitle, isEditMode }) {
  const classes = useStyles();

  return (
    <>
      {isEditMode ? (
        <InputBase
          placeholder={"Title"}
          classes={{
            root: classes.inputTitleRoot,
            input: classes.inputTitleInput
          }}
          inputProps={{ "aria-label": "note title" }}
          value={title}
          multiline={true}
          onChange={(event) => setTitle(event.target.value)}
        />
      ) : (
          <Typography className={classes.textTitle} variant="subtitle1">
            {title}
          </Typography>
        )}
    </>
  );
}
