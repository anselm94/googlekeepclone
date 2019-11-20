import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Chip } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  labelsWrapper: {
    display: "flex",
    padding: theme.spacing(0.75, 1.25)
  },
  labelWrapper: {
    padding: theme.spacing(0, 0.5)
  },
  label: {
    ...theme.custom.fontFamily.metropolis,
    fontSize: theme.typography.overline.fontSize,
    backgroundColor: theme.custom.palette.labelBackground
  }
}));

export default function({ labels }) {
  const classes = useStyles();

  return (
    <div className={classes.labelsWrapper}>
      {labels.map(text => (
        <div className={classes.labelWrapper}>
          <Chip label={text} size="small" classes={{root: classes.label}} />
        </div>
      ))}
    </div>
  );
}
