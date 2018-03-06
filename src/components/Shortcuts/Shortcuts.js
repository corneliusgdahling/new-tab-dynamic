import React, { Component } from 'react'
import ShortcutCard from '../Shortcuts/ShortcutCard'

class Shortcuts extends Component {
  constructor() {
    super()
    this.state = {
      cardName: localStorage.getItem('cardName') ? localStorage.getItem('cardName') : 'Undefined',
      cardUrl: localStorage.getItem('cardUrl') ? localStorage.getItem('cardUrl') : 'chrome://newtab',
      imageUrl: localStorage.getItem('imageUrl') ? localStorage.getItem('imageUrl') : 'https://www.iconfinder.com/data/icons/huge-black-icons/512/Help.png',
      info: localStorage,
      editMode: false,
    }
    this.onChangeCardUrl = this.onChangeCardUrl.bind(this)
    this.onChangeCardName = this.onChangeCardName.bind(this)
    this.onChangeImageUrl = this.onChangeImageUrl.bind(this)
    this.onClick = this.onClick.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  onClick() {
    this.setState({ editMode: !this.state.editMode })
  }

  onChangeCardUrl(e, v) {
    this.setState({ cardUrl: v })
  }

  onChangeCardName(e, v) {
    this.setState({ cardName: v })
  }

  onChangeImageUrl(e, v) {
    this.setState({ imageUrl: v })
  }

  handleSubmit(e) {
    console.log(e.target)
    localStorage.setItem('cardName', this.state.cardName)
    localStorage.setItem('cardUrl', this.state.cardUrl)
    localStorage.setItem('imageUrl', this.state.imageUrl)
    this.setState({ editMode: !this.state.editMode })
  }

  render() {
    // const shortcutCards = this.state.info.map(i => (
    //   <ShortcutCard
    //     onClick={this.onClick}
    //     editMode={this.state.editMode}
    //     handleSubmit={e => this.handleSubmit(e)}
    //     onChangeCardUrl={this.onChangeCardUrl}
    //     onChangeCardName={this.onChangeCardName}
    //     onChangeImageUrl={this.onChangeImageUrl}
    //     cardUrl={i.cardUrl}
    //     cardName={i.cardName}
    //     imageUrl={i.imageUrl}
    //     />
    //   ))
    return (
      <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
        <ShortcutCard
          key={this.state.one}
          onClick={this.onClick}
          editMode={this.state.editMode}
          handleSubmit={e => this.handleSubmit(e)}
          onChangeCardUrl={this.onChangeCardUrl}
          onChangeCardName={this.onChangeCardName}
          onChangeImageUrl={this.onChangeImageUrl}
          cardUrl={this.state.cardUrl}
          cardName={this.state.cardName}
          imageUrl={this.state.imageUrl}
          />
      </div>
    )
  }
}
export default Shortcuts
