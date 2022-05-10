import React, { useContext, useState } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { Card, CardActions, CardMedia, CardTitle } from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import Dialog from "material-ui/Dialog";
import TextField from "material-ui/TextField";
import "./Shortcuts.css";
import ShortcutsContext from "../App/ShortcutsContext";

export interface ShortcutType {
  cardName: string;
  cardUrl: string;
  cardImageUrl: string;
}

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
  };
  const cards = localStorage.getItem("cards")
    ? //@ts-ignore-next-line
      JSON.parse(localStorage.getItem("cards"))
    : [];

  if (cards[index]) {
    cards[index] = card;
  } else {
    cards.push(card);
  }

  localStorage.setItem("cards", JSON.stringify(cards));
};

const publish = (
  index: number,
  cardName: string,
  cardUrl: string,
  cardImageUrl: string,
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>
) => {
  updateLocalStorage(index, cardName, cardUrl, cardImageUrl);
  setEditMode(false);
};

interface ShortcutCardInterface {
  index: number;
}

const ShortcutCard: React.FC<ShortcutCardInterface> = ({
  index,
}: ShortcutCardInterface) => {
  const { shortcuts, editShortcut, removeShortcut } = useContext(ShortcutsContext);

  const shortcut = shortcuts[index]

  const [cardName, setCardName] = useState(shortcut.cardName)
  const [cardUrl, setCardUrl] = useState(shortcut.cardUrl)
  const [cardImageUrl, setCardImageUrl] = useState(shortcut.cardImageUrl)

  const [editMode, setEditMode] = useState(false);

  const [isDeleted, setIsDeleted] = useState(false);

  const actions = [
    <div className="actionsContainer">
      <Button
        className="delete_button"
        variant="contained"
        color="secondary"
        startIcon={<DeleteIcon />}
        onClick={() => {
          removeShortcut(index)
          setIsDeleted(true);
        }}
      >
        Delete
      </Button>
      <FlatButton label="Cancel" primary onClick={() => setEditMode(false)} />
      <FlatButton
        label="Submit"
        primary
        onClick={() => {
          const newShortcut = {
            cardName,
            cardUrl,
            cardImageUrl,
          }
          editShortcut(index, newShortcut)
          setEditMode(false);
        }}
      />
    </div>,
  ];

  return isDeleted ? null : (
    <div>
      <MuiThemeProvider>
        <Card className="card">
          <a href={cardUrl}>
            <CardMedia
              overlay={<CardTitle title={cardName} subtitle={cardUrl.length < 30 ? cardUrl : `${cardUrl.substring(0, 27)}...`} />}
            >
              <img src={cardImageUrl} alt="" className="card_media" />
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
            value={cardName === "Undefined" ? "" : cardName}
            floatingLabelText="Shortcut name"
            floatingLabelFixed
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCardName(e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === "Enter")
                publish(index, cardName, cardUrl, cardImageUrl, setEditMode);
            }}
          />
          <TextField
            className="text_field"
            value={cardUrl === "chrome://newtab" ? "" : cardUrl}
            floatingLabelText="Url (link/webpage) for shortcut"
            floatingLabelFixed
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCardUrl(e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === "Enter")
                publish(index, cardName, cardUrl, cardImageUrl, setEditMode);
            }}
          />
          <TextField
            value={
              cardImageUrl ===
              "https://www.iconfinder.com/data/icons/huge-black-icons/512/Help.png"
                ? ""
                : cardImageUrl
            }
            floatingLabelText="Url (link/webpage) for background image"
            floatingLabelFixed
            fullWidth
            onKeyDown={(e) => {
              if (e.key === "Enter")
                publish(index, cardName, cardUrl, cardImageUrl, setEditMode);
            }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCardImageUrl(e.target.value)
            }
          />
        </Dialog>
      </MuiThemeProvider>
    </div>
  );
};
export default ShortcutCard;
