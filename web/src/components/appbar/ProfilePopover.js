import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Popover, Typography, Avatar, Divider, Button } from "@material-ui/core";
import {
  FaceOutlined as FaceIcon,
} from "@material-ui/icons";
import { useStoreState } from "easy-peasy";
import { useAppLogout } from "../../api";
import { useNavigate } from "@reach/router";

const useStyles = makeStyles(theme => ({
  popover: {
    width: theme.spacing(40),
    borderRadius: theme.shape.borderRadius
  },
  container: {
    display: "flex",
    padding: theme.spacing(2),
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    width: theme.spacing(6),
    height: theme.spacing(6),
    margin: theme.spacing(1),
    background: theme.palette.background.default
  },
  userInfo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingLeft: theme.spacing(1)
  },
  userName: {
    ...theme.custom.fontFamily.metropolis,
    fontSize: "1rem",
    fontWeight: 500
  },
  userEmail: {
    ...theme.custom.fontFamily.roboto,
    fontSize: "0.9rem",
  },
  bar: {
    padding: theme.spacing(2),
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  buttonSignout: {
    ...theme.custom.fontFamily.metropolis,
    borderRadius: theme.spacing(0.5),
    padding: theme.spacing(0.5, 2),
    fontSize: "0.8rem",
    fontWeight: 500,
    textTransform: "none"
  }
}));

export default function ProfilePopover({ anchorEl, isOpen, onClose }) {
  const classes = useStyles();
  const id = isOpen ? "profile-popover" : undefined;
  const userName = useStoreState(state => state.user.userName);
  const userEmail = useStoreState(state => state.user.userEmail);
  const navigate = useNavigate();
  const [isLoggingOut, isSuccess, doLogout] = useAppLogout();

  if (isSuccess) {
    navigate("/login");
    return (<></>);
  }

  return (
    <div>
      <Popover
        id={id}
        open={isOpen}
        anchorEl={anchorEl}
        onClose={onClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
        classes={{
          paper: classes.popover
        }}
      >
        <div className={classes.container}>
          <Avatar
            alt={userName}
            className={classes.avatar}
          >
            <FaceIcon fontSize="large" color="action" />
          </Avatar>
          <div className={classes.userInfo}>
            <Typography className={classes.userName} variant="h6" component="span" color="textPrimary">
              {userName}
            </Typography>
            <Typography className={classes.userEmail} variant="body1" component="span" color="textSecondary">
              {userEmail}
            </Typography>
          </div>
        </div>
        <Divider />
        <div className={classes.bar}>
          <Button disabled={isLoggingOut} variant="outlined" size="small" onClick={doLogout} classes={{ root: classes.buttonSignout }}>Sign out</Button>
        </div>
      </Popover>
    </div>
  );
}
