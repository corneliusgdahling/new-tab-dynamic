import React, { useState } from 'react'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import ShortcutCard from './ShortcutCard'
import './Shortcuts.css'

const Shortcuts = () => {
  const cards = localStorage.getItem('cards')
  // @ts-ignore-next-line
    ? JSON.parse(localStorage.getItem('cards'))
    : []
  const length = cards ? cards.length : 1

  const indices = Array.from(Array(length).keys())

  const [shortcutCards, setShortcutCards] = useState(
    indices.map((index) => <ShortcutCard index={index} />)
  )

  return (
    <>
      <div className="shortcuts">{shortcutCards}</div>
      <div className="buttonContainer">
        <Fab
          color="primary"
          aria-label="Add"
          className="addNewShortcut"
          onClick={() =>
            setShortcutCards([
              ...shortcutCards,
              <ShortcutCard index={shortcutCards.length} />,
            ])
          }
        >
          <AddIcon />
        </Fab>
      </div>
    </>
  )
}
export default Shortcuts
