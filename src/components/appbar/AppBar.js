import React, { useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  useScrollTrigger
} from "@material-ui/core";
import {
  AccountCircleOutlined as AccountsIcon,
  DashboardOutlined as TileViewIcon,
  Brightness4Outlined as ToggleDarkModeIcon,
  RefreshOutlined as RefreshIcon,
  Menu as MenuIcon
} from "@material-ui/icons";
import ProfilePopover from "./ProfilePopover";
import SearchBar from "./SearchBar";

const useStyles = makeStyles(theme => ({
  grow: {
    [theme.breakpoints.up("md")]: {
      flexGrow: 1
    }
  },
  containerBorder: {
    borderBottomStyle: "solid",
    borderBottomWidth: "1px",
    borderBottomColor: theme.palette.divider
  },
  menuButton: {
    [theme.breakpoints.up("md")]: {
      marginRight: theme.spacing(1)
    }
  },
  logoContainer: {
    display: "flex",
    justifyContent: "stretch"
  },
  logo: {
    display: "none",
    height: theme.spacing(5.5),
    padding: theme.spacing(0, 1, 0, 0),
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  title: {
    ...theme.custom.fontFamily.metropolis,
    display: "none",
    [theme.breakpoints.up("xs")]: {
      display: "flex",
      alignItems: "center"
    }
  },
  searchbarContainer: {
    flexGrow: 1,
    marginLeft: theme.spacing(1),
    [theme.breakpoints.up("md")]: {
      flexGrow: 0,
      width: theme.spacing(90),
      marginLeft: theme.spacing(9)
    }
  }
}));

export default function() {
  const menuId = "primary-search-account-menu";
  const classes = useStyles();
  const [isProfilePopoverOpen, setProfilePopoverOpen] = useState(false);
  const profileMenuRef = useRef();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0
  });

  return (
    <div className={classes.grow}>
      <AppBar
        elevation={trigger ? 4 : 0}
        className={trigger ? null : classes.containerBorder}
      >
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <div className={classes.logoContainer}>
            <img className={classes.logo} src={`../../logo.png`} alt={"logo"} />
            <Typography
              color="textSecondary"
              className={classes.title}
              variant="h6"
              noWrap
            >
              Notes
            </Typography>
          </div>
          <div className={classes.searchbarContainer}>
            <SearchBar ml={8} />
          </div>
          <div className={classes.grow} />
          <div>
            <IconButton
              aria-label="refresh"
              aria-controls={menuId}
              onClick={() => setProfilePopoverOpen(true)}
            >
              <RefreshIcon />
            </IconButton>
          </div>
          <div>
            <IconButton
              aria-label="toggle dark theme"
              aria-controls={menuId}
              onClick={() => setProfilePopoverOpen(true)}
            >
              <ToggleDarkModeIcon />
            </IconButton>
          </div>
          <div>
            <IconButton
              aria-label="toggle tile view"
              aria-controls={menuId}
              onClick={() => setProfilePopoverOpen(true)}
            >
              <TileViewIcon />
            </IconButton>
          </div>
          <div>
            <IconButton
              edge="end"
              ref={profileMenuRef}
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={() => setProfilePopoverOpen(true)}
            >
              <AccountsIcon />
            </IconButton>
          </div>
        </Toolbar>
        <ProfilePopover
          anchorEl={profileMenuRef.current}
          isOpen={isProfilePopoverOpen}
          onClose={() => setProfilePopoverOpen(false)}
        />
      </AppBar>
    </div>
  );
}
