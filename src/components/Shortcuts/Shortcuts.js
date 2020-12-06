import React, { useState } from 'react'
import ShortcutCard from '../Shortcuts/ShortcutCard'
import './Shortcuts.css'

const Shortcuts = () => {
  const cards = JSON.parse(localStorage.getItem('cards'))
  const length = cards ? cards.length : 1

  const [shortcutCards, setShortcutCards] = useState([...Array(length).keys()].map(index => <ShortcutCard index={index} />))

  return (
    <React.Fragment>
      <div className="container">
        {shortcutCards}
      </div>
      <button className="addNewShortcut" onClick={() => setShortcutCards([...shortcutCards, <ShortcutCard index={shortcutCards.length} />])}>Add item</button>
    </React.Fragment>
  )
}
export default Shortcuts
