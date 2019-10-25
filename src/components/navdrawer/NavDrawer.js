import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Drawer, List, Divider, Typography, useTheme, useMediaQuery } from "@material-ui/core";
import {
  NotificationsNoneOutlined as NotificationIcon,
  WbIncandescentOutlined as IdeaIcon,
  LabelOutlined as LabelIcon,
  ArchiveOutlined as ArchiveIcon,
  DeleteOutlined as DeleteIcon,
  EditOutlined as EditIcon
} from "@material-ui/icons";
import DrawerItem from "./DrawerItem";

const useStyles = makeStyles(theme => ({
  drawer: {
    width: theme.mixins.drawer.minWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: theme.mixins.drawer.minWidth,
    border: 0
  },
  sectionTitle: {
    padding: theme.spacing(2, 1, 0, 2),
    color: theme.palette.text.secondary
  },
  toolbar: theme.mixins.toolbar
}));

export default function NavDrawer() {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <Drawer
      variant={isMobile ? "temporary" : "permanent"}
      anchor="left"
      open={false}
      classes={{
        root: classes.drawer,
        paper: classes.drawerPaper
      }}
    >
      <div className={classes.toolbar} />
      <List>
        {["Notes", "Reminders"].map((text, index) => (
          <DrawerItem
            key={text}
            text={text}
            isSelected={text === "Notes"}
            icon={index % 2 === 0 ? <IdeaIcon /> : <NotificationIcon />}
          />
        ))}
      </List>
      <Divider />
      <div className={classes.sectionTitle}>
        <Typography variant="overline" component="span">
          Labels
        </Typography>
      </div>
      <List>
        {["Cache", "Concepts", "Information", "My Thoughts", "To Do", "Wish Items"].map((text, index) => (
          <DrawerItem key={text} text={text} icon={<LabelIcon />} />
        ))}
        <DrawerItem text={"Edit labels"} icon={<EditIcon />} />
      </List>
      <Divider />
      <List>
        {["Archive", "Trash"].map((text, index) => (
          <DrawerItem
            key={text}
            text={text}
            icon={index % 2 === 0 ? <ArchiveIcon /> : <DeleteIcon />}
          />
        ))}
      </List>
    </Drawer>
  );
}
