import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Search as SearchIcon,
  CloseOutlined as CloseOutlinedIcon
} from "@material-ui/icons";
import { Box, InputBase, IconButton } from "@material-ui/core";
import { useTheme } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  search: {
    display: "flex",
    justifyContent: "center",
    maxWidth: "100%",
    transition: theme.transitions.create("all", {
      easing: theme.transitions.easing.easeIn,
      duration: theme.transitions.duration.shortest
    }),
    marginLeft: theme.spacing(1)
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    flex: 1,
    alignItems: "center"
  },
  inputInput: {
    width: "100%"
  }
}));

const SearchBar = () => {
  const classes = useStyles();
  const theme = useTheme();

  const [isFocussed, setFocussed] = useState(false);

  return (
    <Box
      className={classes.search}
      borderRadius={theme.shape.borderRadius}
      bgcolor={
        isFocussed
          ? theme.palette.background.default
          : theme.palette.background.highlight
      }
      boxShadow={isFocussed ? 2 : 0}
      height={"3rem"}
    >
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Search"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput
        }}
        onFocus={() => setFocussed(true)}
        onBlur={() => setFocussed(false)}
        inputProps={{ "aria-label": "search" }}
      />
      {isFocussed ? (
        <IconButton hidden={!isFocussed} onClick={() => setFocussed(false)}>
          <CloseOutlinedIcon />
        </IconButton>
      ) : null}
    </Box>
  );
};

export default SearchBar;
