import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  InputBase,
  Checkbox,
  IconButton
} from "@material-ui/core";
import {
  AddOutlined as AddIcon,
  CheckBoxOutlineBlankOutlined as CheckboxBlankIcon,
  CheckBoxOutlined as CheckboxIcon,
  CloseOutlined as CloseIcon
} from "@material-ui/icons";
import { useStoreActions } from "easy-peasy";

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
    textDecorationColor: theme.palette.text.disabled,
    fontWeight: 400,
    fontSize: "0.875rem",
    verticalAlign: "middle"
  },
  closeButtonWrapper: {
    margin: "auto 0"
  }
}));

export default function({ id, noteItems, isEditMode }) {
  const updateNotesItem = useStoreActions(
    actions => actions.notes.updateNotesItem
  );

  const onTextChange = (index, text) => {
    const updatedNoteItems = Object.assign([], noteItems);
    updatedNoteItems[index].text = text;
    updateNotesItem({ id: id, key: "notes", value: updatedNoteItems });
  };
  const onMarkCompleted = (index, isCompleted) => {
    const updatedNoteItems = Object.assign([], noteItems);
    updatedNoteItems[index].isCompleted = isCompleted;
    updateNotesItem({ id: id, key: "notes", value: updatedNoteItems });
  };
  const onDeletePressed = index => {
    const updatedNoteItems = Object.assign([], noteItems);
    updatedNoteItems.splice(index, 1);
    updateNotesItem({ id: id, key: "notes", value: updatedNoteItems });
  };

  if (noteItems.length === 0) {
    noteItems = [{text: "", isCompleted: false}]
  }

  return (
    <>
      {noteItems.map(({ text, isCompleted }, index) => (
        <ContentListItem
          key={index}
          index={index}
          text={text}
          isCompleted={isCompleted}
          isEditMode={isEditMode}
          onTextChange={onTextChange}
          onMarkCompleted={onMarkCompleted}
          onDeletePressed={onDeletePressed}
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
  onDeletePressed
}) {
  const classes = useStyles();
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
          onFocus={() => setFocussed(true)}
          onBlur={() => setFocussed(false)}
          readOnly={!isEditMode}
          multiline={true}
        />
        {isEditMode ? (
          isHovered ? (
            <div className={classes.closeButtonWrapper}>
              <IconButton size="small" onClick={() => onDeletePressed(index)}>
                <CloseIcon fontSize="small" />
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
