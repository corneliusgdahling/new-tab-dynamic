import React, { useState } from 'react'
import Backdrop from '@material-ui/core/Backdrop'
import './Background.css'

const URL = 'https://pixabay.com/api/?key=5546451-397d91c91b993dc32692557b3&q='

const URL_CONFIG = '&image_type=photo&pretty=true'

const getBackgroundUrl = async (searchTerm: string) => {
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

interface BackgroundInterface {
  children: React.ReactNode
}

export const Background: React.FC<BackgroundInterface> = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [backgroundUrl, setBackgroundUrl] = useState(
    localStorage.getItem('backgroundUrl') || ''
  )

  const [editBackground, setEditBackground] = useState(false)

  const setBackground = async (searchTerm: string) => {
    const url = await getBackgroundUrl(searchTerm)
    setBackgroundUrl(url)
    localStorage.setItem('backgroundUrl', url)
  }

  return (
    <>
      <div
        className="background"
        style={{ backgroundImage: `url(${backgroundUrl})` }}
      />
        <button className='editBackgroundButton' onClick={() => setEditBackground(!editBackground)}>
          {editBackground ? 'Close' : 'Picture'}
        </button>
      <Backdrop open={editBackground} transitionDuration={500}>
        <input
          className="input"
          placeholder="Søkeord"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchTerm(e.target.value)
          }
          onKeyDown={async (e) => {
            if (e.key === 'Enter') setBackground(searchTerm)
            else if (e.key === 'Escape') setEditBackground(false)
          }}
          autoFocus
          value={searchTerm}
        />
      </Backdrop>
      <>{!editBackground && children}</>
    </>
  )
}
