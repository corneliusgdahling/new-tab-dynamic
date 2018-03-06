import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Card, CardActions, CardMedia, CardTitle } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'

const ShortcutCard = props => {
  const actions = [
    <FlatButton
      label="Cancel"
      primary
      onTouchTap={props.onClick}
    />,
    <FlatButton
      className="TEST"
      label="Submit"
      primary
      onTouchTap={props.handleSubmit}
    />,
  ]
  return (
    <div style={{ width: '250px', margin: '20px 20px 20px 20px' }} id={props.key}>
      <MuiThemeProvider>
        <Card style={{ borderRadius: '15px' }}>
          <a href={props.cardUrl}>
            <CardMedia
              overlay={
                <CardTitle title={props.cardName} subtitle={props.cardUrl} />
              }>
              <img src={props.imageUrl} alt="" style={{ borderTopRightRadius: '15px', borderTopLeftRadius: '15px' }} />
            </CardMedia>
          </a>
          <CardActions>
            {!props.editMode &&
              <FlatButton
                label="Edit"
                onClick={props.onClick} />
            }
          </CardActions>
        </Card>
      </MuiThemeProvider>
      <MuiThemeProvider>
        <Dialog
          title="Add or modify shortcut"
          modal
          actions={actions}
          open={props.editMode}>
          <TextField
            value={props.cardName === 'Undefined' ? '' : props.cardName}
            floatingLabelText="Shortcut name"
            floatingLabelFixed
            onChange={props.onChangeCardName}
            />
          <TextField
            style={{ color: '#FFF' }}
            value={props.cardUrl === 'chrome://newtab' ? '' : props.cardUrl}
            floatingLabelText="Url (link/webpage) for shortcut"
            floatingLabelFixed
            onChange={props.onChangeCardUrl}
          />
          <TextField
            value={props.imageUrl === 'https://www.iconfinder.com/data/icons/huge-black-icons/512/Help.png' ? '' : props.imageUrl}
            floatingLabelText="Url (link/webpage) for background image"
            floatingLabelFixed
            fullWidth
            onChange={props.onChangeImageUrl}
          />
        </Dialog>
      </MuiThemeProvider>
    </div>
  )
}
export default ShortcutCard
