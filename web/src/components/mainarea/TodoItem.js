import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Fade, ClickAwayListener, useTheme } from "@material-ui/core";
import ActionsBar from "../todo/Actions";
import LabelsBar from "../todo/Labels";
import ContentTitle from "../todo/ContentTitle";
import Content from "../todo/Content";
import { useUiStore, useTodosStore } from "../../store";
import { useMutation } from "urql";
import { updateTodo } from "../../gql";

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    borderColor: theme.custom.palette.itemBorderColor,
    borderWidth: theme.spacing(0.1),
    borderStyle: "solid"
  },
  textTitle: {
    ...theme.custom.fontFamily.metropolis,
    padding: theme.spacing(1.5, 2, 0, 2),
    fontWeight: 500,
    fontSize: "1rem",
    color: theme.palette.text.primary,
    lineHeight: theme.spacing(0.18)
  },
  barWrapper: {
    display: "flex",
    flexDirection: "row",
    padding: theme.spacing(1, 2),
    justifyContent: "space-between"
  }
}));

export default function ({ noteItem, isEditMode }) {
  const classes = useStyles();
  const theme = useTheme();
  const [isHovered, setHovered] = useState(false);
  const [title, setTitle] = useState(noteItem.title);
  const [noteinputs, setNotes] = useState(noteItem.notes);
  const [color, setColor] = useState(noteItem.color);
  const [isCheckboxMode, setCheckboxMode] = useState(noteItem.isCheckboxMode);
  const [labels, setLabels] = useState(noteItem.labels);
  const [, { setNoteInEditMode }] = useUiStore();
  const [, dispatchTodo] = useTodosStore();
  const [, updateTodoExecute] = useMutation(updateTodo);

  const updateColor = (color) => {
    setColor(color);
    updateTodoItem({ color })
  }

  const updateLabels = (labels) => {
    setLabels(labels);
    updateTodoItem({ labels: labels.map((label) => label.id) })
  }

  const updateCheckboxMode = (isCheckboxMode) => {
    setCheckboxMode(isCheckboxMode);
    updateTodoItem({ isCheckboxMode })
  }

  const onAfterEdit = () => {
    updateTodoItem({});
    setNoteInEditMode("")
  }

  const updateTodoItem = (todoItem) => {
    updateTodoExecute({
      id: noteItem.id,
      title: todoItem.title || title,
      notes: todoItem.notes || noteinputs.map((note) => { return { text: note.text, isCompleted: note.isCompleted } }),
      color: todoItem.color || color,
      isCheckboxMode: todoItem.isCheckboxMode || isCheckboxMode,
      labels: todoItem.labels || labels.map((label) => label.id)
    }).then(({ data }) => {
      dispatchTodo({ type: "UPDATED", payload: data.updateTodo });
    });
  }

  return (
    <Paper
      onMouseOver={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={classes.wrapper}
      elevation={isHovered || isEditMode ? 2 : 0}
      style={{ backgroundColor: theme.custom.palette.noteBackground[color] }}
    >
      <ClickAwayListener onClickAway={isEditMode ? (() => onAfterEdit()) : () => { }}>
        <div onClick={() => setNoteInEditMode(noteItem.id)}>
          <ContentTitle title={title} setTitle={setTitle} isEditMode={isEditMode} />
          <Content
            notes={noteinputs}
            setNotes={setNotes}
            isEditMode={isEditMode}
            isCheckboxMode={isCheckboxMode}
          />
        </div>
      </ClickAwayListener>
      <LabelsBar labels={labels} />
      <Fade in={isHovered || isEditMode}>
        <div className={classes.barWrapper}>
          <ActionsBar
            id={noteItem.id}
            color={color}
            setColor={updateColor}
            labels={labels}
            setLabels={updateLabels}
            setCheckboxMode={updateCheckboxMode}
            isCreateMode={false}
            isCheckboxMode={isCheckboxMode}
          />
        </div>
      </Fade>
    </Paper>
  );
}
