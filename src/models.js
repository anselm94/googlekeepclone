import { action, thunk } from "easy-peasy";

const notesItems = {
  "123": {
    id: "123",
    title: "Things to fix",
    notes: [
      {text: "In Mobile Chrome,", isCompleted: false},
      {text: "while in 'Offline' mode for any site,", isCompleted: false},
      {text: "sharing to Whatsapp shares some file", isCompleted: false},
    ],
    labels: new Set(["1"]),
    color: "",
    isCheckboxMode: false,
    isEditMode: true
  },
  "234": {
    id: "234",
    title: "Elementary OS - 123",
    notes: [
      {text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a neque sollicitudin, ", isCompleted: false},
      {text: "suscipit sem in, tristique  llicitudin, suscipit sem in, ", isCompleted: false},
      {text: "tristique  leo. Nullam lorem dolor, gravida nec magna sit amet, ", isCompleted: false},
      {text: "vulputate laoreet mauris. Suspendisse in posuere turpis. ", isCompleted: false},
      {text: "Aliquam sit amet orci sit amet mi euismod pulvinar eget quis felis. Ut elit libero, ", isCompleted: false},
      {text: "eleifend nec massa eget, hendrerit tempor libero. Donec nec velit ac arcu tincidunt maximus. ", isCompleted: false},
      {text: "Ut in odio sed sapien vehicula posuere eget ut ligula.", isCompleted: false}
    ],
    labels: new Set(["2", "3"]),
    color: "",
    isCheckboxMode: true,
    isEditMode: false
  },
  "345": {
    id: "345",
    title: "consectetur adipiscing ",
    notes: [
      {text: "Lorem ipsum dolor sit amet, ", isCompleted: false},
      {text: "consectetur adipiscing elit.", isCompleted: false},
      {text: "Quisqibero, eleifend nec massa eget, ", isCompleted: false},
      {text: "hendrerit tempor libero. ", isCompleted: false},
      {text: "Donec nec velit ac arcu tincidunt maximus. ", isCompleted: false},
      {text: "Ut in odio sed sapien vehicula posuere eget ut ligula.", isCompleted: false}
    ],
    labels: new Set(["3", "4"]),
    color: "",
    isCheckboxMode: false,
    isEditMode: false
  },
  "456": {
    id: "456",
    title: "ac arcu tincidunt maximus",
    notes: [
      {text: "Lorem ipsum dolor sit amet, ", isCompleted: false},
      {text: "consectetur avelit ac arcu tincidunt mcula posuere eget ut ligula.", isCompleted: false}
    ],
    labels: new Set(["1", "5"]),
    color: "",
    isCheckboxMode: true,
    isEditMode: false
  },
  "567": {
    id: "567",
    title: "'Offline' mode for any site ",
    notes: [
      {text: "In Mobile Chrome, while in 'Offline' mode for any site, ", isCompleted: false},
      {text: "sharing to Whatsapp shares some file. ", isCompleted: true},
      {text: "In Mobile Chrome, while in 'Offline' mode for any site, ", isCompleted: false},
      {text: "sharing to Whatsapp shares some file", isCompleted: true}
    ],
    labels: new Set(["1"]),
    color: "",
    isCheckboxMode: true,
    isEditMode: false
  }
};

const labelItems = {
  "1": "Cache",
  "2": "Concepts",
  "3": "Information",
  "4": "My Thoughts",
  "5": "To Do",
  "6": "Wish Items"
};

const notesModel = {
  items: notesItems,
  labels: labelItems,
  setNotesItems: action((state, allNotesItems) => {
    state.items = allNotesItems;
  }),
  setLabelItems: action((state, allLabelItems) => {
    state.labels = allLabelItems;
  }),
  setNoteItem: action((state, noteItem) => {
    state.items[noteItem.id] = noteItem;
  }),
  refresh: thunk(async actions => {
    actions.setNotesItems(notesItems);
  }),
  filterByLabelId: thunk(async (actions, labelId) => {
    if(labelId) {
      const filteredNotes = Object.keys(notesItems).map((noteId) => notesItems[noteId]).filter(note => note.labels.has(labelId));
      actions.setNotesItems(filteredNotes);
    } else {
      actions.setNotesItems(notesItems);
    }
  }),
  addLabel: thunk(async (actions, labelText) => {
    labelItems[Math.random()] = labelText;
    actions.setLabelItems(labelItems);
  }),
  updateNotesItem: thunk(async (actions, {id, key, value}) => {
    const updatedNote = Object.assign({}, notesItems[id]);
    updatedNote[key] = value; //TODO Check
    actions.setNoteItem(updatedNote);
  }),
  setNoteInEditMode: action((state, noteId) => {
    Object.keys(state.items).forEach(id => state.items[noteId].isEditMode = false);
    state.items[noteId].isEditMode = true;
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
  selectedLabelId: "",
  toggleNavBar: action(state => (state.isNavBarOpen = !state.isNavBarOpen)),
  toggleDarkMode: action(state => (state.isDarkMode = !state.isDarkMode)),
  toggleView: action(state => (state.isGridView = !state.isGridView)),
  setSelectedLabelId: action(
    (state, payload) => (state.selectedLabelId = payload)
  )
};

export default {
  notes: notesModel,
  user: userModel,
  ui: uiModel
};
