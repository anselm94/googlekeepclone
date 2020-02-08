import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Popover, Typography, Avatar, Divider, Button } from "@material-ui/core";

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
    width: theme.spacing(10),
    height: theme.spacing(10),
    margin: theme.spacing(1)
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
            alt="Merbin J Anselm"
            src="https://lh3.googleusercontent.com/-YnIFxRVf-Kc/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rfQhyNIh4WKlkTmRVl1PlQX63Ma9g.CMID/s96-c/photo.jpg"
            className={classes.avatar}
          />
          <div className={classes.userInfo}>
            <Typography className={classes.userName} variant="h6" component="span" color="textPrimary">
              Merbin J Anselm
            </Typography>
            <Typography className={classes.userEmail} variant="body1" component="span" color="textSecondary">
              merbinjanselm@gmail.com
            </Typography>
          </div>
        </div>
        <Divider/>
        <div className={classes.bar}>
          <Button variant="outlined" size="small" classes={{root: classes.buttonSignout}}>Sign out</Button>
        </div>
      </Popover>
    </div>
  );
}
