import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, Tooltip } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import ContentCheckbox from "./ContentList";
import ContentText from "./ContentText";

const useStyles = makeStyles(theme => ({
  optionsWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  optionWrapperFirst: {
    padding: theme.spacing(0, 1, 0, 0)
  },
  optionWrapperLast: {
    padding: theme.spacing(0, 0, 0, 1)
  },
  optionWrapper: {
    padding: theme.spacing(0, 1)
  },
  barClose: {}
}));

export default function({ isCreateMode, isCheckboxMode }) {
  const [noteItems, setNoteItems] = useState([{text: "ABC", isCompleted: false}]);
  const onContentChange = () => {
    setNoteItems((notes) => {
      return [{text: "ABC", isCompleted: !notes[0].isCompleted}];
    })
  }

  return (
    <>
      {isCheckboxMode ? (
        <ContentCheckbox noteItems={noteItems} isCreateMode={isCreateMode} onContentChange={onContentChange} />
      ) : (
        <ContentText noteItems={noteItems} isCreateMode={isCreateMode} onContentChange={onContentChange} />
      )}
    </>
  );
}
