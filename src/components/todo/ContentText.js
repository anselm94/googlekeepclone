import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { InputBase, Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  optionsWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  optionWrapperFirst: {
    padding: theme.spacing(0, 1, 0, 0)
  },
  optionWrapperLast: {
    padding: theme.spacing(0, 0, 0, 1)
  },
  optionWrapper: {
    padding: theme.spacing(0, 1)
  },
  barClose: {},
  inputNoteRoot: {
    ...theme.custom.fontFamily.roboto,
    padding: theme.spacing(0.5, 2, 1.5, 2),
  },
  inputNoteInput: {
    fontWeight: 400,
    fontSize: "0.88rem",
    padding: 0,
    color: theme.palette.text.primary
  },
  textNote: {
    ...theme.custom.fontFamily.roboto,
    padding: theme.spacing(0.5, 2, 1.5, 2),
    fontWeight: 400,
    fontSize: "0.88rem",
    color: theme.palette.text.primary
  },
}));

export default function({ isEditMode, noteItems }) {
  const classes = useStyles();
  const reducedText = noteItems.map(({text}) => text).join("\n");

  return (
    <>
      {isEditMode ? (
        <InputBase
          placeholder="Take a note..."
          classes={{
            root: classes.inputNoteRoot,
            input: classes.inputNoteInput
          }}
          inputProps={{ "aria-label": "take a note" }}
          value={reducedText}
          multiline={true}
        />
      ) : (
        <Typography className={classes.textNote} variant="body1">
          {reducedText}
        </Typography>
      )}
    </>
  );
}
