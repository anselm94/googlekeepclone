import React, { createContext, useContext, useState } from 'react';

const TodosContext = createContext([]);
const LabelsContext = createContext([]);
const UserContext = createContext(null);
const UiContext = createContext(null);

export function TodosProvider({ children, todos }) {
    return <TodosContext.Provider value={todos}>{children}</TodosContext.Provider>;
}

export function LabelsProvider({ children, labels }) {
    return <LabelsContext.Provider value={labels}>{children}</LabelsContext.Provider>;
}

export function UserProvider({ children, user }) {
    const [isDarkMode, setDarkMode] = useState(!!user.darkMode);
    const [isListView, setListView] = useState(!!user.listMode);
    const userValue = [{
        name: user.name,
        email: user.email,
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