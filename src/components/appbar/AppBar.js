import React, { useRef, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  useScrollTrigger,
  useMediaQuery
} from "@material-ui/core";
import {
  AccountCircleOutlined as AccountsIcon,
  DashboardOutlined as TileViewIcon,
  Brightness4Outlined as ToggleDarkModeIcon,
  Brightness5Outlined as ToggleLightModeIcon,
  RefreshOutlined as RefreshIcon,
  SearchOutlined as SearchIcon,
  Menu as MenuIcon,
  ViewAgendaOutlined as ListIcon
} from "@material-ui/icons";
import ProfilePopover from "./ProfilePopover";
import SearchBar from "./SearchBar";
import { useStoreActions, useStoreState } from "easy-peasy";

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
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
  const theme = useTheme();
  const [isProfilePopoverOpen, setProfilePopoverOpen] = useState(false);
  const [isSearchShowingInMobile, setSearchShowing] = useState(false);
  const profileMenuRef = useRef();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0
  });
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const isGridView = useStoreState(state => state.ui.isGridView);
  const isDarkMode = useStoreState(state => state.ui.isDarkMode);
  const toggleNavBar = useStoreActions(actions => actions.ui.toggleNavBar);
  const toggleDarkMode = useStoreActions(actions => actions.ui.toggleDarkMode);
  const toggleView = useStoreActions(actions => actions.ui.toggleView);
  const refreshItems = useStoreActions(actions => actions.notes.refresh);

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
            onClick={toggleNavBar}
          >
            <MenuIcon />
          </IconButton>
          {isMobile ? (
            isSearchShowingInMobile ? (
              <SearchContainer onSearchClose={() => setSearchShowing(false)} />
            ) : (
              <LogoContainer />
            )
          ) : (
            <>
              <LogoContainer />
              <SearchContainer onSearchClose={() => setSearchShowing(false)} />
            </>
          )}
          <div className={classes.grow} />
          {isMobile && !isSearchShowingInMobile ? (
            <div>
              <IconButton
                aria-label="search"
                aria-controls={menuId}
                onClick={() => setSearchShowing(true)}
              >
                <SearchIcon />
              </IconButton>
            </div>
          ) : null}
          <div>
            <IconButton
              aria-label="refresh"
              aria-controls={menuId}
              onClick={refreshItems}
            >
              <RefreshIcon />
            </IconButton>
          </div>
          <div>
            <IconButton
              aria-label="toggle dark theme"
              aria-controls={menuId}
              onClick={toggleDarkMode}
            >
              {isDarkMode ? <ToggleLightModeIcon /> : <ToggleDarkModeIcon />}
            </IconButton>
          </div>
          {isMobile ? null : (
            <div>
              <IconButton
                aria-label={
                  isGridView ? "toggle list view" : "toggle tile view"
                }
                aria-controls={menuId}
                onClick={toggleView}
              >
                {isGridView ? <ListIcon /> : <TileViewIcon />}
              </IconButton>
            </div>
          )}
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

function LogoContainer() {
  const classes = useStyles();
  return (
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
  );
}

function SearchContainer({ onSearchClose }) {
  const classes = useStyles();
  return (
    <div className={classes.searchbarContainer}>
      <SearchBar ml={8} onSearchClose={onSearchClose} />
    </div>
  );
}
