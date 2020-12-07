import React, { useState } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Card, CardActions, CardMedia, CardTitle } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import './Shortcuts.css'

const updateLocalStorage = (
  index: number,
  cardName: string,
  cardUrl: string,
  cardImageUrl: string
) => {
  const card = {
    cardName,
    cardUrl,
    cardImageUrl,
  }
  const cards = JSON.parse(localStorage.getItem('cards') || '') || []

  if (cards[index]) {
    cards[index] = card
  } else {
    cards.push(card)
  }

  console.log(cards)

  localStorage.setItem('cards', JSON.stringify(cards))
}

const deleteCard = (
  index: number,
  cardName: string,
  cardUrl: string,
  cardImageUrl: string
) => {
  const card = {
    cardName,
    cardUrl,
    cardImageUrl,
  }
  const cards = JSON.parse(localStorage.getItem('cards') || '') || []

  if (cards[index]) {
    cards.splice(index, 1)
  }

  localStorage.setItem('cards', JSON.stringify(cards))
}

const publish = (
  index: number,
  cardName: string,
  cardUrl: string,
  cardImageUrl: string,
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>
) => {
  updateLocalStorage(index, cardName, cardUrl, cardImageUrl)
  setEditMode(false)
}

interface ShortcutCardInterface {
  index: number
}

const ShortcutCard: React.FC<ShortcutCardInterface> = ({ index }) => {
  const cards = JSON.parse(localStorage.getItem('cards') || '')
  const card =
    cards && cards[index]
      ? cards[index]
      : {
          cardName: 'Undefined',
          cardUrl: 'chrome://newtab',
          cardImageUrl:
            'https://www.iconfinder.com/data/icons/huge-black-icons/512/Help.png',
        }

  const [cardName, setCardName] = useState(card.cardName)
  const [cardUrl, setCardUrl] = useState(card.cardUrl)
  const [cardImageUrl, setCardImageUrl] = useState(card.cardImageUrl)

  const [editMode, setEditMode] = useState(false)

  const [isDeleted, setIsDeleted] = useState(false)

  const actions = [
    <div className="actionsContainer">
      <Button
        className="deleteButton"
        style={{ marginRight: 'auto' }}
        variant="contained"
        color="secondary"
        startIcon={<DeleteIcon />}
        onClick={() => {
          deleteCard(index, cardName, cardUrl, cardImageUrl)
          setIsDeleted(true)
        }}
      >
        Delete
      </Button>
      <FlatButton label="Cancel" primary onClick={() => setEditMode(false)} />
      <FlatButton
        label="Submit"
        primary
        onClick={() => {
          updateLocalStorage(index, cardName, cardUrl, cardImageUrl)
          setEditMode(false)
        }}
      />
    </div>,
  ]

  return isDeleted ? null : (
    <div style={{ width: '250px', margin: '20px 20px 20px 20px' }}>
      <MuiThemeProvider>
        <Card style={{ borderRadius: '15px' }}>
          <a href={cardUrl}>
            <CardMedia
              overlay={<CardTitle title={cardName} subtitle={cardUrl} />}
            >
              <img
                src={cardImageUrl}
                alt=""
                style={{
                  borderTopRightRadius: '15px',
                  borderTopLeftRadius: '15px',
                }}
              />
            </CardMedia>
          </a>
          <CardActions>
            {!editMode && (
              <FlatButton label="Edit" onClick={() => setEditMode(true)} />
            )}
          </CardActions>
        </Card>
      </MuiThemeProvider>
      <MuiThemeProvider>
        <Dialog
          title="Add or modify shortcut"
          modal
          actions={actions}
          open={editMode}
        >
          <TextField
            autoFocus
            value={cardName === 'Undefined' ? '' : cardName}
            floatingLabelText="Shortcut name"
            floatingLabelFixed
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCardName(e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === 'Enter')
                publish(index, cardName, cardUrl, cardImageUrl, setEditMode)
            }}
          />
          <TextField
            style={{ color: '#FFF' }}
            value={cardUrl === 'chrome://newtab' ? '' : cardUrl}
            floatingLabelText="Url (link/webpage) for shortcut"
            floatingLabelFixed
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCardUrl(e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === 'Enter')
                publish(index, cardName, cardUrl, cardImageUrl, setEditMode)
            }}
          />
          <TextField
            value={
              cardImageUrl ===
              'https://www.iconfinder.com/data/icons/huge-black-icons/512/Help.png'
                ? ''
                : cardImageUrl
            }
            floatingLabelText="Url (link/webpage) for background image"
            floatingLabelFixed
            fullWidth
            onKeyDown={(e) => {
              if (e.key === 'Enter')
                publish(index, cardName, cardUrl, cardImageUrl, setEditMode)
            }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCardImageUrl(e.target.value)
            }
          />
        </Dialog>
      </MuiThemeProvider>
    </div>
  )
}
export default ShortcutCard
