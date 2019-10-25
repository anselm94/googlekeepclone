import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, Tooltip } from "@material-ui/core";
import {
  PaletteOutlined as PaletteIcon,
  UndoOutlined as UndoIcon,
  RedoOutlined as RedoIcon,
  LabelOutlined as LabelIcon,
  DeleteOutlineOutlined as DeleteIcon,
  FileCopyOutlined as CopyIcon,
  CheckBoxOutlined as CheckBoxIcon
} from "@material-ui/icons";
import { useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  optionsWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  optionWrapperFirst: {
    padding: theme.spacing(0, 1, 0, 0)
  },
  optionWrapperLast: {
    padding: theme.spacing(0, 0, 0, 1)
  },
  optionWrapper: {
    padding: theme.spacing(0, 1)
  },
  barClose: {}
}));

export default function({ isCreateMode }) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div className={classes.optionsWrapper}>
      <div className={classes.optionWrapperFirst}>
        <Tooltip title="Change color">
          <IconButton size="small" aria-label="change color">
            <PaletteIcon
              htmlColor={theme.custom.palette.iconHighlight}
              fontSize="small"
            />
          </IconButton>
        </Tooltip>
      </div>
      <div className={classes.optionWrapper}>
        <Tooltip title="Show checkboxes">
          <IconButton size="small" aria-label="show checkboxes">
            <CheckBoxIcon
              htmlColor={theme.custom.palette.iconHighlight}
              fontSize="small"
            />
          </IconButton>
        </Tooltip>
      </div>
      {isCreateMode ? (
        <>
          <div className={classes.optionWrapper}>
            <Tooltip title="Undo">
              <IconButton size="small" disabled aria-label="undo changes">
                <UndoIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </div>
          <div className={classes.optionWrapperLast}>
            <Tooltip title="Redo">
              <IconButton size="small" disabled aria-label="redo changes">
                <RedoIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </div>
        </>
      ) : (
        <>
          <div className={classes.optionWrapper}>
            <Tooltip title="Make a copy">
              <IconButton size="small" aria-label="make a copy">
                <CopyIcon
                  htmlColor={theme.custom.palette.iconHighlight}
                  fontSize="small"
                />
              </IconButton>
            </Tooltip>
          </div>
          <div className={classes.optionWrapper}>
            <Tooltip title="Change labels">
              <IconButton size="small" aria-label="Change labels">
                <LabelIcon
                  htmlColor={theme.custom.palette.iconHighlight}
                  fontSize="small"
                />
              </IconButton>
            </Tooltip>
          </div>
          <div className={classes.optionWrapperLast}>
            <Tooltip title="Delete note">
              <IconButton size="small" aria-label="delete note">
                <DeleteIcon
                  htmlColor={theme.custom.palette.iconHighlight}
                  fontSize="small"
                />
              </IconButton>
            </Tooltip>
          </div>
        </>
      )}
    </div>
  );
}
