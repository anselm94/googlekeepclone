import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Paper, InputBase, Collapse, Button } from "@material-ui/core";
import TodoActions from "../todo/Actions";
import TodoLabels from "../todo/Labels";
import TodoContent from "../todo/Content";
import { useMutation } from "urql";
import { createTodo } from "../../gql";

const useStyles = makeStyles(theme => ({
  paperWrapper: {
    transition: theme.transitions.create("all", {
      easing: theme.transitions.easing.easeIn,
      duration: theme.transitions.duration.short
    })
  },
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

export default function () {
  const classes = useStyles();
  const theme = useTheme();
  const [, createTodoExecute] = useMutation(createTodo);
  const [isFocussed, setFocussed] = useState(false);
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState([]);
  const [color, setColor] = useState(theme.custom.palette.noteBackground[0]);
  const [isCheckboxMode, setCheckboxMode] = useState(false);
  const [labels, setLabels] = useState([]);
  const onCloseClick = () => {
    const noteTexts = notes.map(noteItem => noteItem.text);
    const labelIds = labels.map(labelItem => labelItem.id);
    createTodoExecute({ title, notes: noteTexts, labels: labelIds, color, isCheckboxMode });
    setTitle("");
    setNotes([]);
    setColor(theme.custom.palette.noteBackground[0]);
    setLabels([]);
    setFocussed(false);
  }

  return (
    <Paper
      elevation={2}
      classes={{ root: classes.paperWrapper }}
      style={{ backgroundColor: color }}
    >
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
          value={title}
          onChange={event => setTitle(event.target.value)}
        />
        {isFocussed ? (
          <TodoContent
            notes={notes}
            setNotes={setNotes}
            isEditMode={true}
            isCheckboxMode={isCheckboxMode}
          />
        ) : null}
        <TodoLabels labels={labels} />
        <div className={classes.barWrapper}>
          <TodoActions
            id={""}
            color={color}
            setColor={setColor}
            labels={labels}
            setLabels={setLabels}
            setCheckboxMode={setCheckboxMode}
            isCreateMode={true}
            isCheckboxMode={isCheckboxMode}
          />
          <div>
            <Button size="small" onClick={onCloseClick}>
              Close
            </Button>
          </div>
        </div>
      </Collapse>
    </Paper>
  );
}
