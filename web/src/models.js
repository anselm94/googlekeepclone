import { action, thunk } from "easy-peasy";

const newItem = {
  title: "",
  notes: [{ text: "", isCompleted: false }],
  labels: new Set(),
  color: "",
  isCheckboxMode: false
};

const notesItems = {
  "123": {
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
  },
  "234": {
    id: "234",
    title: "Elementary OS - 123",
    notes: [
      {
        text:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a neque sollicitudin, ",
        isCompleted: false
      },
      {
        text: "suscipit sem in, tristique  llicitudin, suscipit sem in, ",
        isCompleted: false
      },
      {
        text:
          "tristique  leo. Nullam lorem dolor, gravida nec magna sit amet, ",
        isCompleted: false
      },
      {
        text: "vulputate laoreet mauris. Suspendisse in posuere turpis. ",
        isCompleted: false
      },
      {
        text:
          "Aliquam sit amet orci sit amet mi euismod pulvinar eget quis felis. Ut elit libero, ",
        isCompleted: false
      },
      {
        text:
          "eleifend nec massa eget, hendrerit tempor libero. Donec nec velit ac arcu tincidunt maximus. ",
        isCompleted: false
      },
      {
        text: "Ut in odio sed sapien vehicula posuere eget ut ligula.",
        isCompleted: false
      }
    ],
    labels: new Set(["2", "3"]),
    color: "",
    isCheckboxMode: true
  },
  "345": {
    id: "345",
    title: "consectetur adipiscing ",
    notes: [
      { text: "Lorem ipsum dolor sit amet, ", isCompleted: false },
      { text: "consectetur adipiscing elit.", isCompleted: false },
      { text: "Quisqibero, eleifend nec massa eget, ", isCompleted: false },
      { text: "hendrerit tempor libero. ", isCompleted: false },
      {
        text: "Donec nec velit ac arcu tincidunt maximus. ",
        isCompleted: false
      },
      {
        text: "Ut in odio sed sapien vehicula posuere eget ut ligula.",
        isCompleted: false
      }
    ],
    labels: new Set(["3", "4"]),
    color: "",
    isCheckboxMode: false
  },
  "456": {
    id: "456",
    title: "ac arcu tincidunt maximus",
    notes: [
      { text: "Lorem ipsum dolor sit amet, ", isCompleted: false },
      {
        text:
          "consectetur avelit ac arcu tincidunt mcula posuere eget ut ligula.",
        isCompleted: false
      }
    ],
    labels: new Set(["1", "5"]),
    color: "",
    isCheckboxMode: true
  },
  "567": {
    id: "567",
    title: "'Offline' mode for any site ",
    notes: [
      {
        text: "In Mobile Chrome, while in 'Offline' mode for any site, ",
        isCompleted: false
      },
      { text: "sharing to Whatsapp shares some file. ", isCompleted: true },
      {
        text: "In Mobile Chrome, while in 'Offline' mode for any site, ",
        isCompleted: false
      },
      { text: "sharing to Whatsapp shares some file", isCompleted: true }
    ],
    labels: new Set(["1"]),
    color: "",
    isCheckboxMode: true
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
  new: newItem,
  items: notesItems,
  labels: labelItems,
  noteInEditMode: "",
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
  resetNewItem: action(state => {
    state.new = newItem;
  }),
  refresh: thunk(async actions => {
    actions.setNotesItems(notesItems);
  }),
  filterNotesByLabelId: thunk(async (actions, labelId) => {
    if (labelId) {
      const filteredNotes = Object.keys(notesItems)
        .map(noteId => notesItems[noteId])
        .filter(note => note.labels.has(labelId));
      actions.setNotesItems(filteredNotes);
    } else {
      actions.setNotesItems(notesItems);
    }
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
