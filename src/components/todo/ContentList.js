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
    height: theme.spacing(4)
  },
  inputRoot: {
    flex: 1
  },
  textEmpty: {
    ...theme.custom.fontFamily.metropolis,
    fontWeight: 500,
    fontSize: "0.875rem",
    lineHeight: "0.875rem",
    verticalAlign: "middle"
  },
  textIncomplete: {
    fontWeight: 400,
    fontSize: "0.875rem",
    lineHeight: "0.875rem",
    verticalAlign: "middle"
  },
  textComplete: {
    textDecoration: "line-through",
    textDecorationColor: theme.palette.text.disabled,
    fontWeight: 400,
    fontSize: "0.875rem",
    lineHeight: "0.875rem",
    verticalAlign: "middle"
  },
  closeButtonWrapper: {
    margin: "auto 0"
  }
}));

export default function({ noteItems, isCreateMode, onContentChange }) {
  const incompleteNoteitems = noteItems.filter(isCompleted => isCompleted);
  const completedNoteitems = noteItems.filter(isCompleted => !isCompleted);
  const hasCompletedNoteItems = completedNoteitems.length > 0;

  const onTextChange = () => {
    onContentChange();
  };
  const onMarkCompleted = () => {
    onContentChange();
  };

  return (
    <>
      {isCreateMode ? (
        <>
          <ContentMarkList
            noteItems={incompleteNoteitems}
            onTextChange={onTextChange}
            onMarkCompleted={onMarkCompleted}
          />
          {hasCompletedNoteItems ? (
            <>
              <hr />
              <ExpansionPanel expanded={true}>
                <ExpansionPanelSummary expandIcon={<ExpandIcon />}>
                  <Typography>
                    `${completedNoteitems.length} Completed items`
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Typography>
                    Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
                    feugiat. Aliquam eget maximus est, id dignissim quam.
                  </Typography>
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

function ContentMarkList({ noteItems, onTextChange, onMarkCompleted }) {
  return (
    <>
      {noteItems.map(({ text, isCompleted }, index) => (
        <ContentListItem
          key={index}
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
  onTextChange,
  onMarkCompleted
}) {
  const classes = useStyles();
  const [isFocussed, setFocussed] = useState(false);
  const isEmpty = text === "";
  return (
    <div
      className={
        isFocussed
          ? classes.itemContainerWithBorder
          : classes.itemContainerWithoutBorder
      }
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
          disabled={isEmpty}
          color="default"
          checked={isCompleted}
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
        />
        {isEmpty ? null : (
          <div className={classes.closeButtonWrapper}>
            <IconButton size="small">
              <CloseIcon fontSize="small" />
            </IconButton>
          </div>
        )}
      </div>
    </div>
  );
}
