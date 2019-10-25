import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import TodoCreateBar from "./TodoCreate";
import TodoDisplay from "./TodoDisplay";
import { useMediaQuery } from "@material-ui/core";

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
    columnGap: "0.5rem",
  },
  todoWrapper: {
    width: theme.spacing(29),
    breakInside: "avoid",
    pageBreakInside: "avoid",
    padding: "0.5rem 0",
    transition: theme.transitions.create("all", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
  }
}));

export default function() {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const isTablet = useMediaQuery(theme.breakpoints.up('sm'));
  const isLaptop = useMediaQuery(theme.breakpoints.up('md'));
  const isLaptopL = useMediaQuery(theme.breakpoints.up('lg'));
  const is4K = useMediaQuery(theme.breakpoints.up('xl'));
  const numberOfColumns = is4K ? 8 : (isLaptopL ? 4 : (isLaptop ? 3 : (isTablet ? 2 : 1) ));
  const width = is4K ? "100%" : ( isLaptopL ? "1000px" : (isLaptop ? "730px" : (isTablet ? "480px" : "100%")))
  const todos = [
    {
      title: "Things to fix",
      notes:
        "In Mobile Chrome, while in 'Offline' mode for any site, sharing to Whatsapp shares some file",
      labels: ["Cache"]
    },
    {
      title: "Elementary OS - 123",
      notes:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a neque sollicitudin, suscipit sem in, tristique  llicitudin, suscipit sem in, tristique  leo. Nullam lorem dolor, gravida nec magna sit amet, vulputate laoreet mauris. Suspendisse in posuere turpis. Aliquam sit amet orci sit amet mi euismod pulvinar eget quis felis. Ut elit libero, eleifend nec massa eget, hendrerit tempor libero. Donec nec velit ac arcu tincidunt maximus. Ut in odio sed sapien vehicula posuere eget ut ligula.",
      labels: ["Cache", "To Do"]
    },
    {
      title: "consectetur adipiscing",
      notes:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisqibero, eleifend nec massa eget, hendrerit tempor libero. Donec nec velit ac arcu tincidunt maximus. Ut in odio sed sapien vehicula posuere eget ut ligula.",
      labels: ["Cache", "To Do"]
    },
    {
      title: " ac arcu tincidunt maximus",
      notes:
        "Lorem ipsum dolor sit amet, consectetur avelit ac arcu tincidunt mcula posuere eget ut ligula.",
      labels: ["Cache", "To Do"]
    },
    {
      title: "'Offline' mode for any site",
      notes:
        "In Mobile Chrome, while in 'Offline' mode for any site, sharing to Whatsapp shares some file. In Mobile Chrome, while in 'Offline' mode for any site, sharing to Whatsapp shares some file",
      labels: ["Cache"]
    },
    {
      title: "Quisque a neque",
      notes:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a neque sollicitudin, suscipit sem in, tristique leo. Nullam lorem dolor, gravida nec magna sit amet, vulputate laoreet mauris. Suspendisse in posuere turpis. Aliquam sit amet orci sit amet mi euismod pulvinar eget quis felis. Ut elit libero, eleifend nec massa eget, hendrerit tempor libero. Donec nec velit ac arcu tincidunt maximus. Ut in odio sed sapien vehicula posuere eget ut ligula.",
      labels: ["Cache", "To Do"]
    },
    {
      title: "Donec nec velit",
      notes:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisqibero, eleifend nec massa eget, hendrerit tempor libero. Donec nec velit ac arcu tincidunt maximus. Ut in odio sed sapien vehicula posuere eget ut ligula.",
      labels: ["Cache", "To Do"]
    },
    {
      title: "Ut in odio sed sapien",
      notes:
        "Lorem ipsum dolor sit amet, consectetur avelit ac arcu tincidunt maximus. Ut in odio sed sapien vehicula posuere eget ut ligula.",
      labels: ["Cache", "To Do"]
    },
    {
      title: "'Offline' mode for any site",
      notes:
        "In Mobile Chrome, while in 'Offline' mode for any site, sharing to Whatsapp shares some file. In Mobile Chrome, while in 'Offline' mode for any site, sharing to Whatsapp shares some file",
      labels: ["Cache"]
    },
    {
      title: "Quisque a neque",
      notes:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a neque sollicitudin, suscipit sem in, tristique leo. Nullam lorem dolor, gravida nec magna sit amet, vulputate laoreet mauris. Suspendisse in posuere turpis. Aliquam sit amet orci sit amet mi euismod pulvinar eget quis felis. Ut elit libero, eleifend nec massa eget, hendrerit tempor libero. Donec nec velit ac arcu tincidunt maximus. Ut in odio sed sapien vehicula posuere eget ut ligula.",
      labels: ["Cache", "To Do"]
    },
    {
      title: "Donec nec velit",
      notes:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisqibero, eleifend nec massa eget, hendrerit tempor libero. Donec nec velit ac arcu tincidunt maximus. Ut in odio sed sapien vehicula posuere eget ut ligula.",
      labels: ["Cache", "To Do"]
    },
    {
      title: "Ut in odio sed sapien",
      notes:
        "Lorem ipsum dolor sit amet, consectetur avelit ac arcu tincidunt maximus. Ut in odio sed sapien vehicula posuere eget ut ligula.",
      labels: ["Cache", "To Do"]
    },
  ];

  return (
    <main>
      <div className={isMobile ? classes.contentShift : classes.content}>
        <div className={classes.todoCreateContainer}>
          <div className={classes.todoCreateWrapper}>
            <TodoCreateBar />
          </div>
        </div>
        <div className={classes.todosWrapper} style={{columnCount: numberOfColumns, width: width}}>
            {todos.map(({ title, notes, labels }, index) => (
              <div key={index} className={classes.todoWrapper} style={{width: isMobile ? "100%": null}}>
                <TodoDisplay title={title} notes={notes} labels={labels} />
              </div>
            ))}
          </div>
      </div>
    </main>
  );
}
