import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { InputBase } from "@material-ui/core";

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
    padding: theme.spacing(1.5, 2)
  },
  inputNoteInput: {
    fontWeight: 500,
    fontSize: "0.85rem",
    padding: 0,
    color: theme.palette.text.primary
  }
}));

export default function({ isCreateMode, noteItems }) {
  const classes = useStyles();
  const text = noteItems.join("\n");

  return (
    <>
      <InputBase
        placeholder="Take a note..."
        classes={{
          root: classes.inputNoteRoot,
          input: classes.inputNoteInput
        }}
        inputProps={{ "aria-label": "take a note" }}
      >
        {text}
      </InputBase>
    </>
  );
}
