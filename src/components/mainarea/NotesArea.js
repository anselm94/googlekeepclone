import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import TodoCreate from "./TodoCreate";
import TodoItem from "./TodoItem";
import { useMediaQuery } from "@material-ui/core";
import { useStoreState } from "easy-peasy";

const useStyles = makeStyles(theme => ({
  content: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: theme.mixins.drawer.minWidth - theme.spacing(2.5),
    marginRight: -1 * theme.spacing(3)
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
  todoCreateContainer: {
    display: "flex",
    padding: theme.spacing(4, 0),
    margin: theme.spacing(0, 1)
  },
  todoCreateWrapper: {
    flex: 1,
    maxWidth: theme.spacing(75),
    margin: "0 auto"
  },
  todosWrapper: {
    margin: "0 auto",
    columnWidth: theme.spacing(29),
    columnGap: "0.5rem"
  },
  todoWrapper: {
    width: theme.spacing(29),
    margin: "0 auto",
    breakInside: "avoid",
    pageBreakInside: "avoid",
    padding: "0.5rem 0",
    transition: theme.transitions.create("all", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.standard
    })
  }
}));

export default function() {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const isTablet = useMediaQuery(theme.breakpoints.up("sm"));
  const isLaptop = useMediaQuery(theme.breakpoints.up("md"));
  const isLaptopL = useMediaQuery(theme.breakpoints.up("lg"));
  const is4K = useMediaQuery(theme.breakpoints.up("xl"));
  const numberOfColumns = is4K
    ? 8
    : isLaptopL
    ? 4
    : isLaptop
    ? 3
    : isTablet
    ? 2
    : 1;
  var width = is4K
    ? "100%"
    : isLaptopL
    ? "1000px"
    : isLaptop
    ? "730px"
    : isTablet
    ? "480px"
    : "100%";
  const isNavBarOpen = useStoreState(state => state.ui.isNavBarOpen);
  const isListView = !useStoreState(state => state.ui.isGridView);
  const notesItems = useStoreState(state => state.notes.items);
  const noteInEditMode = useStoreState(state => state.notes.noteInEditMode);
  width = isListView
    ? isLaptop || isLaptopL
      ? theme.spacing(75)
      : "100%"
    : width;
  const noteTexts = Object.keys(notesItems).map(id => notesItems[id]);

  return (
    <main>
      <div
        className={
          isMobile || !isNavBarOpen ? classes.contentShift : classes.content
        }
      >
        <div className={classes.todoCreateContainer}>
          <div className={classes.todoCreateWrapper}>
            <TodoCreate />
          </div>
        </div>
        <div
          className={classes.todosWrapper}
          style={{
            columnCount: isListView ? 1 : numberOfColumns,
            width: width
          }}
        >
          {noteTexts.map(({ id, title, notes, labels, color, isCheckboxMode }) => {
            return (
              <div
                key={id}
                className={classes.todoWrapper}
                style={{ width: isMobile || isListView ? "100%" : null }}
              >
                <TodoItem
                  id={id}
                  title={title}
                  notes={notes}
                  labels={labels}
                  color={color}
                  isCheckboxMode={isCheckboxMode}
                  isEditMode={id === noteInEditMode}
                />
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
