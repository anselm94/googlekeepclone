import React, { useState } from "react";
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
import { useMutation } from "urql";
import { createLabel } from "../../gql";
import { useLabelsStore } from "../../store";

const useStyles = makeStyles(theme => ({
  popover: {
    width: theme.spacing(28),
    borderRadius: theme.spacing(0.5),
    background: theme.palette.background.default
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

export default function LabelPopover({ anchorEl, labels, setLabels, isOpen, onClose }) {
  const classes = useStyles();
  const theme = useTheme();
  const popoverId = isOpen ? "color-popover" : undefined;
  const [newLabelName, setNewLabelName] = useState("");
  const [allLabelItems, dispatchLabel] = useLabelsStore();
  const filteredLabelItems = allLabelItems.filter(labelItem =>
    newLabelName === "" || labelItem.name.includes(newLabelName)
  );
  const [, createLabelExecute] = useMutation(createLabel);
  const updateLabelsForNote = (labelItem) => {
    const updatedLabelIndex = labels.findIndex(selectedLabel => selectedLabel.id === labelItem.id);
    if (updatedLabelIndex > -1) {
      labels.splice(updatedLabelIndex, 1);
    } else {
      labels.push(labelItem);
    }
    setLabels(Object.assign([], labels));
  };
  const onCreateTodoClick = () => {
    createLabelExecute({ name: newLabelName }).then(({ data }) => {
      dispatchLabel({ type: "CREATED", payload: data.createLabel });
    });
    setNewLabelName("");
  }
  return (
    <div>
      <Popover
        id={popoverId}
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
                value={newLabelName}
                onChange={event => setNewLabelName(event.target.value)}
              />
              <SearchIcon
                fontSize="small"
                htmlColor={theme.palette.grey[500]}
              />
            </div>
          </div>
          <List dense={true} component="div" style={{ width: "100%" }}>
            {filteredLabelItems.map(labelItem => {
              const labelAriaId = `checkbox-list-label-${labelItem.id}`;

              return (
                <ListItem
                  alignItems="flex-start"
                  key={labelItem.id}
                  dense={true}
                  button={true}
                  disableGutters={true}
                  classes={{ root: classes.listItemIconRoot }}
                  onClick={() => updateLabelsForNote(labelItem)}
                >
                  <ListItemIcon classes={{ root: classes.listItemIconRoot }}>
                    <Checkbox
                      tabIndex={-1}
                      icon={<CheckboxBlankIcon fontSize="small" />}
                      checkedIcon={<CheckboxIcon fontSize="small" />}
                      color="default"
                      disableRipple
                      checked={labels.some((label) => label.id === labelItem.id)}
                      inputProps={{ "aria-labelledby": labelAriaId }}
                      size="small"
                      classes={{ root: classes.checkboxRoot }}
                    />
                  </ListItemIcon>
                  <ListItemText id={labelItem.id} disableTypography>
                    <Typography
                      variant="body1"
                      classes={{ root: classes.listItemText }}
                    >
                      {labelItem.name}
                    </Typography>
                  </ListItemText>
                </ListItem>
              );
            })}
          </List>
          {newLabelName !== "" ? (
            <>
              <Divider />
              <Button size="small" classes={{ root: classes.footer }} onClick={onCreateTodoClick}>
                <AddIcon fontSize="small" />
                <Typography classes={{ root: classes.footerText }}>
                  Create "<b>{newLabelName}</b>"
                </Typography>
              </Button>
            </>
          ) : null}
        </div>
      </Popover>
    </div>
  );
}
