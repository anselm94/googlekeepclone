import { action, thunk, computed } from "easy-peasy";

const newItem = {
  title: "",
  notes: [{ text: "", isCompleted: false }],
  labels: new Set(),
  color: "",
  isCheckboxMode: false
};

const notesItems = [{
  id: "123",
  title: "Things to fix",
  notes: [
    { text: "In Mobile Chrome,", isCompleted: false },
    { text: "while in 'Offline' mode for any site,", isCompleted: false },
    { text: "sharing to Whatsapp shares some file", isCompleted: false }
  ],
  labels: new Set(["1"]),
  color: "",
  isCheckboxMode: false
}];

const labelItems = {
  "1": "Cache",
};

const notesModel = {
  new: newItem,           // Holds the new Todo item
  items: notesItems,      // Holds the Todo items
  labels: labelItems,     // Holds all the Label items
  noteInEditMode: "",     // Holds the id of Todo item, which is in edit mode
  selectedLabelId: "",      // Holds the id of the Label selected
  filteredItems: computed(state => { // Computed property holds the filtered items
    return state.items.filter(item => {
      if (state.selectedLabel != "") {
        return item.labels.has(state.selectedLabel);
      } else {
        return true;
      }
    });
  }),
  setNotesItems: action((state, allNotesItems) => {
    state.items = allNotesItems;
  }),
  setNoteItem: action((state, noteItem) => {
    state.items[noteItem.id] = noteItem;
  }),
  updateNotesItem: action((state, { id, key, value }) => {
    if (id) {
      // update the existing item
      const updatedNote = Object.assign({}, state.items[id]);
      updatedNote[key] = value;
      state.items[id] = updatedNote;
    } else {
      // update the new item
      const updatedNew = Object.assign({}, state.new);
      updatedNew[key] = value;
      state.new = updatedNew;
    }
  }),
  setLabelItems: action((state, allLabelItems) => {
    state.labels = allLabelItems;
  }),
  setNoteInEditMode: action((state, noteId) => {
    if (noteId) {
      state.noteInEditMode = noteId;
    } else {
      state.noteInEditMode = "";
    }
  }),
  setSelectedLabelId: action(
    (state, payload) => (state.selectedLabelId = payload)
  ),
  resetNewItem: action(state => {
    state.new = newItem;
  }),
  refresh: thunk(async actions => {
    actions.setNotesItems(notesItems);
  }),
  search: thunk(async (actions, searchTerm) => {

  }),
  createNote: thunk(async (actions, noteItem) => {
    if (
      (noteItem.notes.length > 0 && noteItem.notes[0].text) ||
      noteItem.title
    ) {
      const newId = Math.random();
      noteItem.id = newId;
      actions.resetNewItem();
      actions.setNoteItem(noteItem);
    }
  }),
  copyNote: thunk(async (actions, id) => {
    const copiedNote = Object.assign({}, notesItems[id]);
    const newId = Math.random();
    copiedNote.id = newId;
    actions.setNoteItem(copiedNote);
  }),
  deleteNote: thunk(async (actions, id) => {
    delete notesItems[id];
    actions.setNotesItems(Object.assign({}, notesItems));
  }),
  addLabel: thunk(async (actions, labelText) => {
    labelItems[Math.random()] = labelText;
    actions.setLabelItems(labelItems);
  })
};

const userModel = {
  isLoggedIn: true,
  userName: "",
  userEmail: ""
};

const uiModel = {
  isDarkMode: false,
  isNavBarOpen: true,
  isGridView: true,
  toggleNavBar: action(state => (state.isNavBarOpen = !state.isNavBarOpen)),
  toggleDarkMode: action(state => (state.isDarkMode = !state.isDarkMode)),
  toggleView: action(state => (state.isGridView = !state.isGridView))
};

export default {
  notes: notesModel,
  user: userModel,
  ui: uiModel
};
