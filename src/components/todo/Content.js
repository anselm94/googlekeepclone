import React from "react";
import ContentCheckbox from "./ContentList";
import ContentText from "./ContentText";

export default function({id, isEditMode, isCheckboxMode, noteItems }) {
  const onContentChange = () => {
    
  }

  return (
    <>
      {isCheckboxMode ? (
        <ContentCheckbox id={id} noteItems={noteItems} isEditMode={isEditMode} onContentChange={onContentChange} />
      ) : (
        <ContentText id={id} noteItems={noteItems} isEditMode={isEditMode} onContentChange={onContentChange} />
      )}
    </>
  );
}
