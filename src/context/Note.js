import { createContext, useContext, useEffect, useState } from "react";

const NoteContext = createContext();

const defaultNotes = [
  {
    id: 1,
    title: "Note One",
    text: "Lorem ipsum dolor sit amet.",
  },
  {
    id: 2,
    title: "Note Two",
    text: "Ipsun lorem dolor sit amet.",
  },
];

export const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("notes")) || defaultNotes
  );
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const values = {
    notes,
    setNotes,
  };
  return <NoteContext.Provider value={values}>{children}</NoteContext.Provider>;
};

export const useNote = () => useContext(NoteContext);
