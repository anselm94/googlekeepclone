import React, { createContext, useContext, useState, useReducer } from 'react';

const TodosContext = createContext([]);
const LabelsContext = createContext([]);
const UserContext = createContext(null);
const UiContext = createContext(null);

const reducer = (state = [], action = {}) => {
    const mutatedItem = action.payload;
    if (!mutatedItem) { return }
    const mutatedIndex = state.findIndex((item) => item.id === mutatedItem.id);
    switch (action.type) {
        case "CREATED":
            if (mutatedIndex < 0) {
                state.push(mutatedItem);
            }
            break;
        case "DELETED":
            if (mutatedIndex >= 0) {
                state.splice(mutatedIndex, 1);
            }
            break;
        case "UPDATED":
            state[mutatedIndex] = mutatedItem;
            break;
        default:
    }
    return [...state];
}

export function TodosProvider({ children, todos }) {
    const [state, dispatch] = useReducer(reducer, todos);
    return <TodosContext.Provider value={[state, dispatch]}>{children}</TodosContext.Provider>;
}

export function LabelsProvider({ children, labels }) {
    const [state, dispatch] = useReducer(reducer, labels);
    return <LabelsContext.Provider value={[state, dispatch]}>{children}</LabelsContext.Provider>;
}

export function UserProvider({ children, user }) {
    const [isDarkMode, setDarkMode] = useState(user && user.darkMode);
    const [isListView, setListView] = useState(user && user.listMode);
    const userValue = [{
        name: user && user.name,
        email: user && user.email,
        isDarkMode,
        isListView
    }, {
        toggleDarkMode: () => setDarkMode(!isDarkMode),
        toggleView: () => setListView(!isListView)
    }];
    return <UserContext.Provider value={userValue}>{children}</UserContext.Provider>;
}

export function UiProvider({ children }) {
    const [isNavBarOpen, setNavBarOpen] = useState(true);
    const [noteInEditMode, setNoteInEditMode] = useState("");
    const [selectedLabelId, setSelectedLabelId] = useState("");
    const uiValue = [{
        isNavBarOpen,
        noteInEditMode,
        selectedLabelId
    }, {
        toggleNavBar: () => setNavBarOpen(!isNavBarOpen),
        setNoteInEditMode,
        setSelectedLabelId
    }];
    return <UiContext.Provider value={uiValue}>{children}</UiContext.Provider>;
}

export const useTodosStore = () => useContext(TodosContext);
export const useLabelsStore = () => useContext(LabelsContext);
export const useUserStore = () => useContext(UserContext);
export const useUiStore = () => useContext(UiContext);