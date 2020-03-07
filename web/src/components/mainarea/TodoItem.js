import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Fade, ClickAwayListener } from "@material-ui/core";
import ActionsBar from "../todo/Actions";
import LabelsBar from "../todo/Labels";
import ContentTitle from "../todo/ContentTitle";
import Content from "../todo/Content";
import { useStoreActions } from "easy-peasy";

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    border: "1px",
    borderColor: theme.palette.divider,
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
  const [isHovered, setHovered] = useState(false);
  const [title, setTitle] = useState(noteItem.title);
  const [notes, setNotes] = useState(noteItem.notes);
  const [color, setColor] = useState(noteItem.color);
  const [isCheckboxMode, setCheckboxMode] = useState(noteItem.isCheckboxMode);
  const [labels, setLabels] = useState(noteItem.labels);
  const setNoteInMode = useStoreActions(actions => actions.notes.setNoteInEditMode);

  return (
    <Paper
      onMouseOver={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={classes.wrapper}
      elevation={isHovered || isEditMode ? 2 : 0}
      style={{ backgroundColor: color }}
    >
      <ClickAwayListener onClickAway={isEditMode ? (() => setNoteInMode("")) : () => { }}>
        <div onClick={() => setNoteInMode(noteItem.id)}>
          <ContentTitle title={title} setTitle={setTitle} isEditMode={isEditMode} />
          <Content
            notes={notes}
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
            setColor={setColor}
            labels={labels}
            setLabels={setLabels}
            setCheckboxMode={setCheckboxMode}
            isCreateMode={false}
            isCheckboxMode={isCheckboxMode}
          />
        </div>
      </Fade>
    </Paper>
  );
}
