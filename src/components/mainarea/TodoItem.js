import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Fade } from "@material-ui/core";
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

export default function({
  id,
  title,
  notes,
  labels,
  color,
  isCheckboxMode,
  isEditMode
}) {
  const classes = useStyles();
  const [isHovered, setHovered] = useState(false);
  const setNoteInMode = useStoreActions(
    actions => actions.notes.setNoteInEditMode
  );

  return (
    <Paper
      onMouseOver={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={classes.wrapper}
      elevation={isHovered ? 2 : 0}
      style={{ backgroundColor: color }}
    >
      <ContentTitle id={id} title={title} isEditMode={isEditMode} />
      <Content
        id={id}
        isEditMode={isEditMode}
        isCheckboxMode={isCheckboxMode}
        noteItems={notes}
      />
      <LabelsBar id={id} labels={labels} />
      <Fade in={isHovered || isEditMode}>
        <div className={classes.barWrapper}>
          <ActionsBar
            id={id}
            isCreateMode={false}
            isCheckboxMode={isCheckboxMode}
            labels={labels}
          />
        </div>
      </Fade>
    </Paper>
  );
}
