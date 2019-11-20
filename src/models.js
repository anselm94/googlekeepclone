import { action, thunk } from "easy-peasy";

const notesItems = {
  "123": {
    id: "123",
    title: "Things to fix",
    notes: [
      "In Mobile Chrome,",
      "while in 'Offline' mode for any site,",
      "sharing to Whatsapp shares some file"
    ],
    labels: new Set(["1"]),
    color: ""
  },
  "234": {
    id: "234",
    title: "Elementary OS - 123",
    notes: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a neque sollicitudin, ",
      "suscipit sem in, tristique  llicitudin, suscipit sem in, ",
      "tristique  leo. Nullam lorem dolor, gravida nec magna sit amet, ",
      "vulputate laoreet mauris. Suspendisse in posuere turpis. ",
      "Aliquam sit amet orci sit amet mi euismod pulvinar eget quis felis. Ut elit libero, ",
      "eleifend nec massa eget, hendrerit tempor libero. Donec nec velit ac arcu tincidunt maximus. ",
      "Ut in odio sed sapien vehicula posuere eget ut ligula."
    ],

    labels: new Set(["1", "2"]),
    color: ""
  },
  "345": {
    id: "345",
    title: "consectetur adipiscing ",
    notes: [
      "Lorem ipsum dolor sit amet, ",
      "consectetur adipiscing elit. ",
      "Quisqibero, eleifend nec massa eget, ",
      "hendrerit tempor libero. ",
      "Donec nec velit ac arcu tincidunt maximus. ",
      "Ut in odio sed sapien vehicula posuere eget ut ligula."
    ],
    labels: new Set(["1", "2"]),
    color: ""
  },
  "456": {
    id: "456",
    title: "ac arcu tincidunt maximus",
    notes: [
      "Lorem ipsum dolor sit amet, ",
      "consectetur avelit ac arcu tincidunt mcula posuere eget ut ligula."
    ],
    labels: new Set(["1", "2"]),
    color: ""
  },
  "567": {
    id: "567",
    title: "'Offline' mode for any site ",
    notes: [
      "In Mobile Chrome, while in 'Offline' mode for any site, ",
      "sharing to Whatsapp shares some file. ",
      "In Mobile Chrome, while in 'Offline' mode for any site, ",
      "sharing to Whatsapp shares some file"
    ],
    labels: new Set(["1"]),
    color: ""
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
    actions.setNotesItems(notesItems);
  }),
  updateNotesItem: thunk(async (actions, {id, key, value}) => {
    const updatedNote = Object.assign({}, notesItems[id]);
    updatedNote[key] = value; //TODO Check
    actions.setNoteItem(updatedNote);
  })
};

const newNoteModel = {
  title: "",
  content: [],
  isEditMode: true,
  isCheckboxMode: false,
  labels: [],
  color: 0
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
  new: newNoteModel,
  notes: notesModel,
  user: userModel,
  ui: uiModel
};
