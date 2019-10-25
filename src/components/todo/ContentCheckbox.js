import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, Tooltip, Typography } from "@material-ui/core";
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

export default function({ isCreateMode, noteItems }) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <>
      <FormGroup row>
        {noteItems.map(({}, index) => {
          <FormControlLabel
            key={index}
            control={
              <Checkbox
                color="default"
                checked={state.checkedA}
                onChange={handleChange("checkedA")}
                value="checkedA"
              />
            }
            label={<Typography>ABC</Typography>}
          />;
        })}
      </FormGroup>
    </>
  );
}
