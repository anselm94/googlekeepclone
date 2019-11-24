import React from "react";
import { makeStyles } from "@material-ui/styles";
import { InputBase, Typography } from "@material-ui/core";
import { useStoreActions } from "easy-peasy";

const useStyles = makeStyles(theme => ({
  inputTitleRoot: {
    ...theme.custom.fontFamily.metropolis,
    padding: theme.spacing(1.25, 2)
  },
  inputTitleInput: {
    fontWeight: 500,
    fontSize: "1rem",
    padding: 0,
    lineHeight: "1rem",
    verticalAlign: "middle",
    color: theme.palette.text.primary
  },
  textTitle: {
    ...theme.custom.fontFamily.metropolis,
    padding: theme.spacing(1.5, 2, 0, 2),
    fontWeight: 500,
    fontSize: "1rem",
    color: theme.palette.text.primary,
    lineHeight: theme.spacing(0.18)
  }
}));

export default function({ id, title, isEditMode }) {
  const classes = useStyles();
  const updateNotesItem = useStoreActions(actions => actions.notes.updateNotesItem);

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
          onChange={(event) => updateNotesItem({id: id, key: "title", value: event.target.value})}
        />
      ) : (
        <Typography className={classes.textTitle} variant="subtitle1">
          {title}
        </Typography>
      )}
    </>
  );
}
