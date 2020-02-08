import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles(theme => ({
  listItemRoot: {
    borderRadius: theme.spacing(0, 3, 3, 0)
  },
  listItemSelected: {
    backgroundColor: `${theme.palette.secondary.light} !important`
  }
}));

export default function({ text, icon, isSelected, onClick }) {
  const classes = useStyles();

  return (
    <ListItem
      button
      selected={isSelected}
      classes={{
        selected: classes.listItemSelected,
        root: classes.listItemRoot
      }}
      onClick={onClick}
    >
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={text} />
    </ListItem>
  );
}
