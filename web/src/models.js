import { action, thunk, computed } from "easy-peasy";

const newItem = {
  title: "",
  notes: [{ text: "", isCompleted: false }],
  labels: [],
  color: "",
  isCheckboxMode: false
};

const notesModel = {
  new: newItem,           // Holds the new Todo item
  items: [],      // Holds the Todo items
  labels: [],     // Holds all the Label items
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
  setNoteInEditMode: action((state, noteId) => {
    state.noteInEditMode = noteId || "";
  }),
  setSelectedLabelId: action((state, payload) => {
    state.selectedLabelId = payload
  }),
  search: thunk(async (actions, searchTerm) => {

  }),
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
