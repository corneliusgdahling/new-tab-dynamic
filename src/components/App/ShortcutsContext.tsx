import { createContext } from 'react'
import { ShortcutType } from '../Shortcuts/ShortcutCard'

interface ShortcutsContextInterface {
    shortcuts: ShortcutType[]
    addShortcut: () => void
    editShortcut: (index: number, shortcut: ShortcutType) => void
    removeShortcut: (index: number) => void,
    setAllShortcuts: (shortcuts: ShortcutType[]) => void
}

const ShortcutsContext = createContext<ShortcutsContextInterface>({
    shortcuts: [],
    addShortcut: () => null,
    editShortcut: (index: number, shortcut: ShortcutType) => null,
    removeShortcut: (index: number) => null,
    setAllShortcuts: (shortcuts: ShortcutType[]) => null
})

export default ShortcutsContext