import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ContentCheckbox from "./ContentList";
import ContentText from "./ContentText";

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
