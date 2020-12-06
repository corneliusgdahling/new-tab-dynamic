import React, { Component } from 'react'
import ShortcutCard from '../Shortcuts/ShortcutCard'

const Shortcuts = () => {
  const cards = JSON.parse(localStorage.getItem(cards))
  const length = cards ? cards.length - 1 : 1

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
      {[...Array(length).keys()].map(index => <ShortcutCard index={index} />)}
    </div>
  )
}
export default Shortcuts
