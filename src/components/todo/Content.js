import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, Tooltip } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import TodoContentNote from "./ContentCheckbox";

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

export default function({ isCreateMode, isCheckboxMode }) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <>
      {isCheckboxMode ? (
        <TodoContentNote isCreateMode={true} />
      ) : (
        <TodoContentNote isCreateMode={true} />
      )}
    </>
  );
}
