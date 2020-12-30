import React, { useEffect, useRef, useState } from 'react'
import Backdrop from '@material-ui/core/Backdrop'
import Fab from '@material-ui/core/Fab'
import ImageSearchIcon from '@material-ui/icons/ImageSearch'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft'
import CloseIcon from '@material-ui/icons/Close'
import './Background.css'

const URL = 'https://pixabay.com/api/?key=5546451-397d91c91b993dc32692557b3&q='

const URL_CONFIG = '&image_type=photo'

const getImageUrl = (searchTerm: string, page = 1) => {
  return `${URL}${searchTerm}${URL_CONFIG}&page=${page}`
}

const getBackgroundUrl = async (searchTerm: string, resultNumber = 0) => {
  const resultNumberToUse = resultNumber - 1 > 0 ? resultNumber : 0
  const page = Math.floor(resultNumberToUse / 20) + 1
  const imageUrl = getImageUrl(searchTerm, page)
  const response = await fetch(imageUrl, {
    method: 'GET',
    mode: 'cors',
  })
  if (!response.ok) throw Error()
  const results = await response.json()
  if (resultNumberToUse >= results.totalHits) return
  const resultOnPage = resultNumberToUse % 20
  const url = results.hits[resultOnPage].largeImageURL
  return url
}

interface BackgroundInterface {
  children: React.ReactNode
}

export const Background: React.FC<BackgroundInterface> = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [resultNumber, setResultNumber] = useState(1)
  const [backgroundUrl, setBackgroundUrl] = useState('')

  const [editBackground, setEditBackground] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)

  const setBackground = async (searchTerm: string, resultNumber = 0) => {
    const url = await getBackgroundUrl(searchTerm, resultNumber)
    if (url) {
      setBackgroundUrl(url)
      localStorage.setItem('backgroundUrl', url)
    } else {
      setResultNumber(1)
      setBackground(searchTerm, 1)
    }
  }

  useEffect(() => {
    setBackgroundUrl(localStorage.getItem('backgroundUrl') || '')
  })

  useEffect(() => {
    if (editBackground && inputRef?.current) inputRef.current.focus()
  }, [editBackground, inputRef])

  useEffect(() => {
    if (backgroundUrl) setBackground(searchTerm, resultNumber)
  }, [resultNumber])

  return (
    <>
      <div
        className="background"
        style={{ backgroundImage: `url(${backgroundUrl})` }}
      />
      <div className="editBackgroundButton">
        <Fab onClick={() => setEditBackground(!editBackground)}>
          {editBackground ? <CloseIcon /> : <ImageSearchIcon />}
        </Fab>
      </div>
      <Backdrop open={editBackground} transitionDuration={500}>
        <div className="backgroundSelector">
          <input
            ref={inputRef}
            className="input"
            placeholder="Søkeord"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setSearchTerm(e.target.value)
            }}
            onKeyDown={async (e) => {
              if (e.key === 'Enter')
                setBackground(searchTerm) && setResultNumber(1)
              else if (e.key === 'Escape') setEditBackground(false)
            }}
            value={searchTerm}
          />
          <div className="backgroundIncrementContainer">
            <button
              onClick={() => setResultNumber(resultNumber - 1)}
              className="backgroundIncrement backgroundIncrease"
            >
              <ArrowLeftIcon />
            </button>
            <span className="backgroundIncrement pageNumber">
              <h2>{resultNumber}</h2>
            </span>
            <button
              onClick={() => setResultNumber(resultNumber + 1)}
              className="backgroundIncrement backgroundDecrease"
            >
              <ArrowRightIcon />
            </button>
          </div>
        </div>
      </Backdrop>
      <>{!editBackground && children}</>
    </>
  )
}
