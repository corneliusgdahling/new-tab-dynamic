import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Card, CardActions, CardMedia, CardTitle } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'

class ShortcutCard extends Component {
  constructor() {
    super()
    this.state = {
      cardName: localStorage.getItem('cardName') ? localStorage.getItem('cardName') : 'Undefined',
      cardUrl: localStorage.getItem('cardUrl') ? localStorage.getItem('cardUrl') : 'chrome://newtab',
      imageUrl: localStorage.getItem('imageUrl') ? localStorage.getItem('imageUrl') : 'https://www.iconfinder.com/data/icons/huge-black-icons/512/Help.png',
      editMode: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit() {
    localStorage.setItem('cardName', this.state.cardName)
    localStorage.setItem('cardUrl', this.state.cardUrl)
    localStorage.setItem('imageUrl', this.state.imageUrl)
    this.setState({ editMode: !this.state.editMode })
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={() => this.setState({ editMode: !this.state.editMode })}
      />,
      <FlatButton
        label="Submit"
        primary
        onTouchTap={this.handleSubmit}
      />,
    ]
    return (
      <div style={{ maxWidth: '500px' }}>
        <MuiThemeProvider>
          <Card style={{ borderRadius: '15px' }}>
            <a href={this.state.cardUrl}>
              <CardMedia
                overlay={
                  <CardTitle title={this.state.cardName} subtitle={this.state.cardUrl} />
                }>
                <img src={this.state.imageUrl} alt="" style={{ borderTopRightRadius: '15px', borderTopLeftRadius: '15px' }} />
              </CardMedia>
            </a>
            <CardActions>
              {!this.state.editMode &&
                <FlatButton
                  label="Edit"
                  onClick={() => this.setState({ editMode: !this.state.editMode })} />
              }
            </CardActions>
          </Card>
        </MuiThemeProvider>
        <MuiThemeProvider>
          <Dialog
            title="Add or modify shortcut"
            modal
            actions={actions}
            open={this.state.editMode}>
            <TextField
              value={this.state.cardName === 'Undefined' ? '' : this.state.cardName}
              floatingLabelText="Shortcut name"
              floatingLabelFixed
              onChange={(e, v) => this.setState({ cardName: v })}
              />
            <TextField
              style={{ color: '#FFF' }}
              value={this.state.cardUrl === 'chrome://newtab' ? '' : this.state.cardUrl}
              floatingLabelText="Url (link/webpage) for shortcut"
              floatingLabelFixed
              onChange={(e, v) => this.setState({ cardUrl: v })}
            />
            <TextField
              value={this.state.imageUrl === 'https://www.iconfinder.com/data/icons/huge-black-icons/512/Help.png' ? '' : this.state.imageUrl}
              floatingLabelText="Url (link/webpage) for background image"
              floatingLabelFixed
              fullWidth
              onChange={(e, v) => this.setState({ imageUrl: v })}
            />
          </Dialog>
        </MuiThemeProvider>
      </div>
    )
  }
}
export default ShortcutCard
