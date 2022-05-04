import React, { useContext } from 'react'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import ShortcutCard from './ShortcutCard'
import './Shortcuts.css'
import ShortcutsContext from '../App/ShortcutsContext'

const Shortcuts = (): JSX.Element => {
  const { shortcuts, addShortcut } = useContext(ShortcutsContext)

  const shortcutCards = shortcuts.map((_, index) => <ShortcutCard index={index} />)

  return (
    <>
      <div className="shortcuts">{shortcutCards}</div>
      <div className="buttonContainer">
        <Fab
          color="primary"
          aria-label="Add"
          className="addNewShortcut"
          onClick={() =>
            addShortcut()
          }
        >
          <AddIcon />
        </Fab>
      </div>
    </>
  )
}
export default Shortcuts
