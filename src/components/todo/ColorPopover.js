import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Popover, Checkbox } from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import { DoneOutlined as CheckIcon } from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
  popover: {
    width: theme.spacing(17),
    height: theme.spacing(13.5),
    borderRadius: theme.spacing(0.5)
  },
  container: {
    margin: theme.spacing(0.8),
    display: "grid",
    gridGap: theme.spacing(0.5),
    gridTemplateRows: `repeat(3, ${theme.spacing(3.5)}px)`,
    gridTemplateColumns: `repeat(4, ${theme.spacing(3.5)}px)`,
    justifyItems: "center",
    alignItems: "center"
  },
  checkboxRoot: {
    padding: "0px !important"
  },
  colorCircle: {
    height: theme.spacing(3.5),
    width: theme.spacing(3.5),
    margin: "auto",
    borderRadius: "50%",
    display: "inline-block",
    borderStyle: "solid",
    borderColor: "transparent",
    borderWidth: "2px"
  }
}));

export default function ColorPopover({ anchorEl, isOpen, onClose }) {
  const classes = useStyles();
  const theme = useTheme();
  const id = isOpen ? "color-popover" : undefined;

  return (
    <div>
      <Popover
        id={id}
        open={isOpen}
        anchorEl={anchorEl}
        onClose={onClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left"
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        classes={{
          paper: classes.popover
        }}
      >
        <div className={classes.container}>
          {theme.custom.palette.noteBackground.map((color, index) => (
            <ColorItem key={index} color={color} />
          ))}
        </div>
      </Popover>
    </div>
  );
}

function ColorItem({ color }) {
  const classes = useStyles();
  return (
    <Checkbox
      classes={{ root: classes.checkboxRoot }}
      icon={<ColorUnselected color={color} />}
      checkedIcon={<ColorSelected color={color} />}
      color="default"
    />
  );
}

function ColorUnselected({ color }) {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <span
      className={classes.colorCircle}
      style={{
        backgroundColor: color,
        borderColor: color === "#FFF" ? theme.palette.divider : "transparent"
      }}
    />
  );
}

function ColorSelected({ color }) {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <span
      className={classes.colorCircle}
      style={{
        backgroundColor: color,
        borderColor: theme.custom.palette.iconHighlight
      }}
    >
      <CheckIcon htmlColor={theme.custom.palette.noteColorCheck} />
    </span>
  );
}
