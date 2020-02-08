import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Chip } from "@material-ui/core";
import { useStoreState } from "easy-peasy";

const useStyles = makeStyles(theme => ({
  labelsWrapper: {
    display: "flex",
    flexWrap: "wrap",
    padding: theme.spacing(0, 1.25)
  },
  labelWrapper: {
    padding: theme.spacing(0.36, 0.5)
  },
  label: {
    ...theme.custom.fontFamily.metropolis,
    fontSize: theme.typography.overline.fontSize,
    backgroundColor: theme.custom.palette.labelBackground
  }
}));

export default function({ labels = new Set() }) {
  const classes = useStyles();
  const labelItems = useStoreState(state => state.notes.labels);

  return (
    <div className={classes.labelsWrapper}>
      {[...labels].map(id => (
        <div key={id} className={classes.labelWrapper}>
          <Chip label={labelItems[id]} size="small" classes={{root: classes.label}} />
        </div>
      ))}
    </div>
  );
}
