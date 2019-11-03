import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, InputBase, Collapse, Button } from "@material-ui/core";
import TodoActions from "../todo/Actions";
import TodoLabels from "../todo/Labels";
import TodoContent from "../todo/Content";

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
        <InputBase
            placeholder={isFocussed ? "Title" : "Take a note..."}
            classes={{
              root: isFocussed ? classes.inputTitleRoot : classes.inputNoteRoot,
              input: classes.inputTitleInput
            }}
            onFocus={() => setFocussed(true)}
            inputProps={{ "aria-label": "note title" }}
          />
        {isFocussed ? (
          <TodoContent isCreateMode={true} isCheckboxMode={true}/>
        ) : null}
        
        <TodoLabels labels={labels} />
        <div className={classes.barWrapper}>
          <TodoActions isCreateMode={true} />
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
