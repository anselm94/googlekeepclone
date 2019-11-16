import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Popover,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Typography,
  InputBase,
  Divider,
  Button,
  useTheme
} from "@material-ui/core";
import {
  CheckBoxOutlineBlankOutlined as CheckboxBlankIcon,
  CheckBoxOutlined as CheckboxIcon,
  AddOutlined as AddIcon,
  SearchOutlined as SearchIcon
} from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
  popover: {
    width: theme.spacing(28),
    borderRadius: theme.spacing(0.5)
  },
  container: {
    display: "flex",
    flexDirection: "column"
  },
  header: {
    padding: theme.spacing(1.5, 1.5, 0, 1.5),
    marginBottom: theme.spacing(-1)
  },
  searchInput: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  inputText: {
    ...theme.custom.fontFamily.roboto,
    fontWeight: 400,
    fontSize: "0.8rem",
    flex: 1
  },
  listItemIconRoot: {
    margin: "0 !important",
    padding: "0 !important",
    minWidth: "0px"
  },
  checkboxRoot: {
    margin: `${theme.spacing(0.5)}px ${theme.spacing(1)}px ${theme.spacing(
      0.5
    )}px ${theme.spacing(1.5)}px !important`,
    padding: "0 !important"
  },
  listItemText: {
    ...theme.custom.fontFamily.roboto,
    fontWeight: 400,
    fontSize: "0.8rem"
  },
  footer: {
    display: "flex",
    flexDirection: "row",
    padding: theme.spacing(0.8, 1.5, 0.8, 1.5),
    borderRadius: 0,
    justifyContent: "left"
  },
  footerText: {
    ...theme.custom.fontFamily.roboto,
    fontWeight: 400,
    fontSize: "0.8rem",
    paddingLeft: theme.spacing(1),
    textTransform: "none"
  }
}));

export default function ColorPopover({ anchorEl, isOpen, onClose }) {
  const classes = useStyles();
  const theme = useTheme();
  const id = isOpen ? "color-popover" : undefined;

  return (
    <div>
      <Popover
        id={id}
        open={isOpen}
        anchorEl={anchorEl}
        onClose={onClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left"
        }}
        classes={{
          paper: classes.popover
        }}
      >
        <div className={classes.container}>
          <div className={classes.header}>
            <Typography variant="subtitle2">Label note</Typography>
            <div className={classes.searchInput}>
              <InputBase
                classes={{ root: classes.inputText }}
                placeholder="Enter label name"
              />
              <SearchIcon fontSize="small" htmlColor={theme.palette.grey[500]}/>
            </div>
          </div>
          <List dense={true} component="div" style={{ width: "100%" }}>
            {[0, 1, 2, 3].map(value => {
              const labelId = `checkbox-list-label-${value}`;

              return (
                <ListItem
                  alignItems="flex-start"
                  key={value}
                  dense={true}
                  button={true}
                  disableGutters={true}
                  classes={{ root: classes.listItemIconRoot }}
                >
                  <ListItemIcon classes={{ root: classes.listItemIconRoot }}>
                    <Checkbox
                      tabIndex={-1}
                      icon={<CheckboxBlankIcon fontSize="small" />}
                      checkedIcon={<CheckboxIcon fontSize="small" />}
                      color="default"
                      disableRipple
                      inputProps={{ "aria-labelledby": labelId }}
                      size="small"
                      classes={{ root: classes.checkboxRoot }}
                    />
                  </ListItemIcon>
                  <ListItemText id={labelId} disableTypography>
                    <Typography
                      variant="body1"
                      classes={{ root: classes.listItemText }}
                    >
                      {`Line item ${value + 1}`}
                    </Typography>
                  </ListItemText>
                </ListItem>
              );
            })}
          </List>
          <Divider />
          <Button size="small" classes={{ root: classes.footer }}>
            <AddIcon fontSize="small" />
            <Typography classes={{ root: classes.footerText }}>
              Create "<b>abc</b>"
            </Typography>
          </Button>
        </div>
      </Popover>
    </div>
  );
}
