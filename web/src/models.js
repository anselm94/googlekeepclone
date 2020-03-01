import { action, thunk, computed } from "easy-peasy";

const newItem = {
  title: "",
  notes: [{ text: "", isCompleted: false }],
  labels: [],
  color: "",
  isCheckboxMode: false
};

const notesItems = [];

const labelItems = [];

const notesModel = {
  new: newItem,           // Holds the new Todo item
  items: notesItems,      // Holds the Todo items
  labels: labelItems,     // Holds all the Label items
  noteInEditMode: "",     // Holds the id of Todo item, which is in edit mode
  selectedLabelId: "",      // Holds the id of the Label selected
  filteredItems: computed(state => { // Computed property holds the filtered items
    return state.items.filter(item => {
      if (state.selectedLabelId !== "") {
        return item.labels.some((labelItem) => labelItem.id === state.selectedLabelId);
      } else {
        return true;
      }
    });
  }),
  setNotesItems: action((state, allNotesItems) => {
    state.items = allNotesItems;
  }),
  addNoteItem: action((state, noteItem) => {
    state.items.push(noteItem);
  }),
  deleteNoteItem: action((state, id) => {
    const deleteIndex = state.items.findIndex((item) => item.id === id);
    state.items.splice(deleteIndex, 1);
  }),
  updateNoteItem: action((state, updatedItem) => {
    const updateIndex = state.items.findIndex((item) => item.id === updatedItem.id);
    state.items[updateIndex] = updatedItem;
  }),
  setLabelItems: action((state, allLabelItems) => {
    state.labels = allLabelItems;
  }),
  addLabelItem: action((state, labelItem) => {
    state.labels.push(labelItem);
  }),
  deleteLabelItem: action((state, id) => {
    const deleteIndex = state.labels.findIndex((label) => label.id === id);
    state.labels.splice(deleteIndex, 1);
  }),
  updateLabelItem: action((state, updatedLabel) => {
    const updateIndex = state.labels.findIndex((label) => label.id === updatedLabel.id);
    state.labels[updateIndex] = updatedLabel;
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
  setNoteInEditMode: action((state, noteId) => {
    if (noteId) {
      state.noteInEditMode = noteId;
    } else {
      state.noteInEditMode = "";
    }
  }),
  setSelectedLabelId: action((state, payload) => {
    state.selectedLabelId = payload
  }),
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
      // actions.setNoteItem(noteItem);
    }
  }),
  copyNote: thunk(async (actions, id) => {
    const copiedNote = Object.assign({}, notesItems[id]);
    const newId = Math.random();
    copiedNote.id = newId;
    // actions.setNoteItem(copiedNote);
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
  userEmail: "",
  setNameAndEmail: action((state, payload) => {
    state.userName = payload.name;
    state.userEmail = payload.email;
  })
};

const uiModel = {
  isDarkMode: false,
  isNavBarOpen: true,
  isGridView: true,
  setSettings: action((state, payload) => {
    state.isDarkMode = payload.darkMode;
    state.isGridView = !payload.listMode;
  }),
  toggleNavBar: action(state => (state.isNavBarOpen = !state.isNavBarOpen)),
  toggleDarkMode: action(state => (state.isDarkMode = !state.isDarkMode)),
  toggleView: action(state => (state.isGridView = !state.isGridView))
};

export default {
  notes: notesModel,
  user: userModel,
  ui: uiModel
};
