import React, { Component } from 'react'
import Shortcuts from '../Shortcuts/Shortcuts'
import './Background.css'

class Background extends Component {
  constructor() {
    super()
    this.state = {
      searchTerm: 'summer+sea',
      fetchUrl: '',
      backgroundUrl: localStorage.getItem('backgroundUrl') ? localStorage.getItem('backgroundUrl') : '',
    }
    this.getBackgroundUrl = this.getBackgroundUrl.bind(this)
  }

  componentWillMount() {
    this.setState({ fetchUrl: 'https://pixabay.com/api/?key=5546451-397d91c91b993dc32692557b3&q=' + this.state.searchTerm + '&image_type=photo&pretty=true' })
  }

  getBackgroundUrl() {
    this.fetchRequest()
    .then(response => {
      const x = response.hits[Math.round(Math.random() * 15)].webformatURL
      this.setState({ backgroundUrl: x })
      localStorage.setItem('backgroundUrl', x)
    })
    console.log('Background Url', this.state.backgroundUrl, typeof this.state.backgroundUrl)
  }

  fetchRequest() {
    return fetch(this.state.fetchUrl, {
      method: 'GET',
      mode: 'cors',
    })
    .then(response => {
      if (!response.ok) throw Error()
      return response.json()
    })
  }

  render() {
    return (
      <div className="gridContainer" style={{ backgroundImage: `url(${this.state.backgroundUrl})` }}>
        <Shortcuts />
        <button style={{ height: '40px', marginRight: '100px', marginTop: '400px' }} onClick={this.getBackgroundUrl}>Fetch!</button>
      </div>
    )
  }
}
export default Background
