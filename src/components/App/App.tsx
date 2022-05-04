import React, { useEffect, useState } from "react";
import { Background } from "../Background/Background";
import { ExportJson } from "../ExportJson/ExportJson";
import { ShortcutType } from "../Shortcuts/ShortcutCard";
import Shortcuts from "../Shortcuts/Shortcuts";
import "./App.css";
import ShortcutsContext from "./ShortcutsContext";

const App = (): JSX.Element => {
  const initialShortcuts: ShortcutType[] = localStorage.getItem("cards")
    ? // @ts-ignore-next-line
      JSON.parse(localStorage.getItem("cards"))
    : [];
  const [shortcuts, setShortcuts] = useState<ShortcutType[]>(initialShortcuts)

  useEffect(() => {
    localStorage.setItem("cards", JSON.stringify(shortcuts));
  }, [shortcuts])
  
  const addShortcut = (): void => {
    setShortcuts([...shortcuts, {
      cardName: 'Undefined',
      cardUrl: 'chrome://newtab',
      cardImageUrl:
        'https://www.iconfinder.com/data/icons/huge-black-icons/512/Help.png',
    }])
  }
  
  const editShortcut = (index: number, shortcut: ShortcutType): void => {
    const modShortcuts = [...shortcuts]
    modShortcuts[index] = shortcut
    setShortcuts(modShortcuts)
  }
  
  const removeShortcut = (index: number): void => {
    const modShortcuts = [...shortcuts]
    modShortcuts.splice(index, 1)
    setShortcuts(modShortcuts)
  }
  
  const setAllShortcuts = (shortcuts: ShortcutType[]): void => {
    setShortcuts(shortcuts)
  }


  return (
    <Background>
      <ShortcutsContext.Provider value={{
        shortcuts,
        addShortcut,
        editShortcut,
        removeShortcut,
        setAllShortcuts,
      }}>
        <ExportJson />
        <Shortcuts />
      </ShortcutsContext.Provider>
    </Background>
  );
};

export default App;
