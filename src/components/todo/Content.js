import React from "react";
import ContentList from "./ContentList";
import ContentText from "./ContentText";

export default function({ id, isEditMode, isCheckboxMode, noteItems }) {
  return (
    <>
      {isCheckboxMode ? (
        <ContentList id={id} noteItems={noteItems} isEditMode={isEditMode} />
      ) : (
        <ContentText id={id} noteItems={noteItems} isEditMode={isEditMode} />
      )}
    </>
  );
}
