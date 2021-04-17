import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  InputBase,
  Checkbox,
  IconButton,
  useTheme
} from "@material-ui/core";
import {
  AddOutlined as AddIcon,
  CheckBoxOutlineBlankOutlined as CheckboxBlankIcon,
  CheckBoxOutlined as CheckboxIcon,
  CloseOutlined as CloseIcon
} from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
  itemContainerWithBorder: {
    borderStyle: "solid",
    borderWidth: `${theme.spacing(0.1)}px 0 ${theme.spacing(0.1)}px 0`,
    borderColor: theme.palette.divider
  },
  itemContainerWithoutBorder: {
    borderStyle: "solid",
    borderWidth: `${theme.spacing(0.1)}px 0 ${theme.spacing(0.1)}px 0`,
    borderColor: "transparent"
  },
  itemWrapper: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(1),
    minHeight: theme.spacing(4)
  },
  inputRoot: {
    flex: 1
  },
  checkboxRoot: {
    margin: `auto ${theme.spacing(1.5)}px`,
    padding: "0 !important",
    color: `${theme.custom.palette.notesCheckbox} !important`
  },
  textEmpty: {
    ...theme.custom.fontFamily.metropolis,
    fontWeight: 500,
    fontSize: "0.875rem",
    verticalAlign: "middle"
  },
  textIncomplete: {
    fontWeight: 400,
    fontSize: "0.875rem",
    verticalAlign: "middle"
  },
  textComplete: {
    textDecoration: "line-through",
    textDecorationColor: theme.palette.text.secondary,
    fontWeight: 400,
    fontSize: "0.875rem",
    verticalAlign: "middle"
  },
  closeButtonWrapper: {
    margin: "auto 0"
  }
}));

export default function ({ notes, setNotes, isEditMode }) {
  const onTextChange = (index, text) => {
    const updatedNoteItems = Object.assign([], notes);
    updatedNoteItems[index].text = text;
    setNotes(updatedNoteItems);
  };
  const onMarkCompleted = (index, isCompleted) => {
    const updatedNoteItems = Object.assign([], notes);
    updatedNoteItems[index].isCompleted = isCompleted;
    setNotes(updatedNoteItems);
  };
  const onDeletePressed = index => {
    const updatedNoteItems = Object.assign([], notes);
    updatedNoteItems.splice(index, 1);
    setNotes(updatedNoteItems);
  };
  const onKeyPressed = (index, event) => {
    if (event.keyCode === 13) { // Enter pressed, create a new row item
      event.preventDefault();
      var updatedNoteItems = Object.assign([], notes);
      updatedNoteItems = updatedNoteItems.filter(note => note.text !== "")
      updatedNoteItems.splice(index + 1, 0, { text: "", isCompleted: false });
      setNotes(updatedNoteItems);
    }
  };

  if (notes.length === 0) {
    notes = [{ text: "", isCompleted: false }]
  }

  return (
    <>
      {notes.map(({ text, isCompleted }, index) => (
        <ContentListItem
          key={index}
          index={index}
          text={text}
          isCompleted={isCompleted}
          isEditMode={isEditMode}
          onTextChange={onTextChange}
          onMarkCompleted={onMarkCompleted}
          onDeletePressed={onDeletePressed}
          onKeyPressed={onKeyPressed}
        />
      ))}
    </>
  );
}

function ContentListItem({
  index,
  text,
  isCompleted,
  isEditMode,
  onTextChange,
  onMarkCompleted,
  onDeletePressed,
  onKeyPressed
}) {
  const classes = useStyles();
  const theme = useTheme();
  const [isFocussed, setFocussed] = useState(false);
  const [isHovered, setHovered] = useState(false);
  const isEmpty = text === "";
  return (
    <div
      className={
        isFocussed
          ? classes.itemContainerWithBorder
          : classes.itemContainerWithoutBorder
      }
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={classes.itemWrapper}>
        <Checkbox
          icon={
            (isEmpty && isEditMode) ? (
              <AddIcon fontSize="small" />
            ) : (
                <CheckboxBlankIcon fontSize="small" />
              )
          }
          checkedIcon={<CheckboxIcon fontSize="small" />}
          color="default"
          checked={isCompleted}
          disabled={!isEditMode || isEmpty}
          classes={{ root: classes.checkboxRoot }}
          onChange={event => onMarkCompleted(index, event.target.checked)}
        />
        <InputBase
          classes={{
            root: classes.inputRoot,
            input: isEmpty
              ? classes.textEmpty
              : isCompleted
                ? classes.textComplete
                : classes.textIncomplete
          }}
          value={text}
          placeholder={isEditMode ? "List Item" : ""}
          onChange={event => onTextChange(index, event.target.value)}
          onKeyDown={event => onKeyPressed(index, event)}
          onFocus={() => setFocussed(true)}
          onBlur={() => setFocussed(false)}
          autoFocus={isEmpty}
          readOnly={!isEditMode}
          multiline={true}
        />
        {isEditMode ? (
          isHovered ? (
            <div className={classes.closeButtonWrapper}>
              <IconButton size="small" onClick={() => onDeletePressed(index)}>
                <CloseIcon htmlColor={theme.custom.palette.iconColor} fontSize="small" />
              </IconButton>
            </div>
          ) : (
              <div style={{ width: "26px" }} />
            )
        ) : null}
      </div>
    </div>
  );
}
