import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  InputBase,
  Checkbox,
  IconButton,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography
} from "@material-ui/core";
import {
  AddOutlined as AddIcon,
  CheckBoxOutlineBlankOutlined as CheckboxBlankIcon,
  CheckBoxOutlined as CheckboxIcon,
  CloseOutlined as CloseIcon,
  ExpandMoreOutlined as ExpandIcon
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
    textDecorationColor: theme.palette.text.disabled,
    fontWeight: 400,
    fontSize: "0.875rem",
    verticalAlign: "middle"
  },
  closeButtonWrapper: {
    margin: "auto 0"
  }
}));

export default function({ noteItems, isEditMode, onContentChange }) {
  const incompleteNoteitems = noteItems.filter(
    ({ isCompleted }) => !isCompleted
  );
  const completedNoteitems = noteItems.filter(
    ({ isCompleted }) => isCompleted
  );
  const hasCompletedNoteItems = completedNoteitems.length > 0;

  const onTextChange = () => {
    onContentChange();
  };
  const onMarkCompleted = () => {
    onContentChange();
  };

  return (
    <>
      {isEditMode ? (
        <>
          <ContentMarkList
            noteItems={incompleteNoteitems}
            isEditMode={isEditMode}
            onTextChange={onTextChange}
            onMarkCompleted={onMarkCompleted}
          />
          {hasCompletedNoteItems ? (
            <>
              <hr />
              <ExpansionPanel expanded={true}>
                <ExpansionPanelSummary expandIcon={<ExpandIcon />}>
                  <Typography>
                    {`${completedNoteitems.length} Completed items`}
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <ContentMarkList
                    noteItems={completedNoteitems}
                    isEditMode={isEditMode}
                    onTextChange={onTextChange}
                    onMarkCompleted={onMarkCompleted}
                  />
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </>
          ) : null}
        </>
      ) : (
        <ContentMarkList
          noteItems={noteItems}
          onTextChange={onTextChange}
          onMarkCompleted={onMarkCompleted}
        />
      )}
    </>
  );
}

function ContentMarkList({
  noteItems,
  isEditMode,
  onTextChange,
  onMarkCompleted
}) {
  return (
    <>
      {noteItems.map(({ text, isCompleted }, index) => (
        <ContentListItem
          key={index}
          text={text}
          isCompleted={isCompleted}
          isEditMode={isEditMode}
          onTextChange={onTextChange}
          onMarkCompleted={onMarkCompleted}
        />
      ))}
    </>
  );
}

function ContentListItem({
  id,
  text,
  isCompleted,
  isEditMode,
  onTextChange,
  onMarkCompleted
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
            isEmpty ? (
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
          onChange={event => onMarkCompleted(id, event.target.checked)}
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
          placeholder="List Item"
          onChange={event => onTextChange(id, event.target.value)}
          onFocus={() => setFocussed(true)}
          onBlur={() => setFocussed(false)}
          readOnly={!isEditMode}
          multiline={true}
        />
        {isEditMode && isHovered ? (
          <div className={classes.closeButtonWrapper}>
            <IconButton size="small">
              <CloseIcon fontSize="small" />
            </IconButton>
          </div>
        ) : null}
      </div>
    </div>
  );
}
