import React from "react";
import ContentCheckbox from "./ContentList";
import ContentText from "./ContentText";

export default function({id, isEditMode, isCheckboxMode, noteItems }) {
  const onContentChange = () => {
    
  }

  return (
    <>
      {isCheckboxMode ? (
        <ContentCheckbox noteItems={noteItems} isEditMode={isEditMode} onContentChange={onContentChange} />
      ) : (
        <ContentText noteItems={noteItems} isEditMode={isEditMode} onContentChange={onContentChange} />
      )}
    </>
  );
}
