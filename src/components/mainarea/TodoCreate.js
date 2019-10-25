import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, InputBase, Collapse, Button } from "@material-ui/core";
import ActionsBar from "../todo/Actions";
import LabelsBar from "../todo/Labels";

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: "flex",
    flexDirection: "column"
  },
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
  inputNoteRoot: {
    ...theme.custom.fontFamily.roboto,
    padding: theme.spacing(1.5, 2)
  },
  inputNoteInput: {
    fontWeight: 500,
    fontSize: "0.85rem",
    padding: 0,
    color: theme.palette.text.primary
  },
  barWrapper: {
    display: "flex",
    flexDirection: "row",
    padding: theme.spacing(1, 2),
    justifyContent: "space-between"
  }
}));

export default function() {
  const classes = useStyles();
  const [isFocussed, setFocussed] = useState(false);

  const labels = ["Cache", "To Do", "Later"];

  return (
    <Paper elevation={2}>
      <Collapse
        classes={{ wrapperInner: classes.wrapper }}
        in={isFocussed}
        collapsedHeight="2.7rem"
      >
        {isFocussed ? (
          <InputBase
            placeholder="Title"
            classes={{
              root: classes.inputTitleRoot,
              input: classes.inputTitleInput
            }}
            inputProps={{ "aria-label": "note title" }}
          />
        ) : null}
        <InputBase
          placeholder="Take a note..."
          classes={{
            root: classes.inputNoteRoot,
            input: isFocussed ? classes.inputNoteInput : classes.inputTitleInput
          }}
          onFocus={() => setFocussed(true)}
          inputProps={{ "aria-label": "take a note" }}
        />
        <LabelsBar labels={labels} />
        <div className={classes.barWrapper}>
          <ActionsBar isCreateMode={true} />
          <div>
            <Button size="small" onClick={() => setFocussed(false)}>
              Close
            </Button>
          </div>
        </div>
      </Collapse>
    </Paper>
  );
}
