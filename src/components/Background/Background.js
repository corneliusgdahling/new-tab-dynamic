import React, { useState } from 'react'
import Shortcuts from '../Shortcuts/Shortcuts'
import './Background.css'

const URL = 'https://pixabay.com/api/?key=5546451-397d91c91b993dc32692557b3&q='

const URL_CONFIG = '&image_type=photo&pretty=true'

const getBackgroundUrl = async searchTerm => {
  const response = await fetch(URL + searchTerm + URL_CONFIG, {
    method: 'GET',
    mode: 'cors',
  })
  if (!response.ok) throw Error()
  const results = await response.json()
  const randNum = Math.random() * results.hits.length - 1
  if (!results.hits[Math.round(randNum > 0 ? randNum : 0)]) {
    return
  }
  const url = results.hits[Math.round(randNum > 0 ? randNum : 0)].webformatURL
  return url
}

export const Background = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [backgroundUrl, setBackgroundUrl] = useState(localStorage.getItem('backgroundUrl') || '')

  const setBackground = async searchTerm => {
  const url = await getBackgroundUrl(searchTerm)
  setBackgroundUrl(url)
  localStorage.setItem('backgroundUrl', url)
}

return (
  <div className="gridContainer" style={{ backgroundImage: `url(${backgroundUrl})` }}>
    <Shortcuts />
    <div className="searchContainer">
      <input className="input" type="text" onChange={e => setSearchTerm(e.target.value)} onKeyDown={async e => {
        if (e.key === 'Enter') setBackground(searchTerm)
      }} />
      <button onClick={async () => setBackground(searchTerm)}>Fetch!</button>
    </div>
  </div>
)
}
