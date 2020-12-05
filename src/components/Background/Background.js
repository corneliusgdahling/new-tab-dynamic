import React, { useState } from 'react'
import Shortcuts from '../Shortcuts/Shortcuts'
import './Background.css'

const URL = 'https://pixabay.com/api/?key=5546451-397d91c91b993dc32692557b3&q='

const URL_CONFIG = '&image_type=photo&pretty=true'

const getBackgroundUrl = async searchTerm => {
  console.log({searchTerm})
  const response = await fetch(URL + searchTerm + URL_CONFIG, {
    method: 'GET',
    mode: 'cors',
  })
  if (!response.ok) throw Error()
  const results = await response.json()
  const url = results.hits[Math.round(Math.random() * results.hits.length - 1)].webformatURL
  console.log('url', url)
  return url
}

export const Background = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [backgroundUrl, setBackgroundUrl] = useState('')

  console.log('backgroundURL', backgroundUrl)

  return (
    <div className="gridContainer" style={{ backgroundImage: `url(${backgroundUrl})` }}>
      <Shortcuts />
      <div>
      <input className="input" type="text" onChange={e => setSearchTerm(e.target.value)} />
      <button style={{ height: '40px', marginRight: '100px', marginTop: '400px' }} onClick={async () => setBackgroundUrl(await getBackgroundUrl(searchTerm))}>Fetch!</button>
      </div>
    </div>
  )
}
