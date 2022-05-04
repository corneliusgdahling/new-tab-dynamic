import React, { useCallback, useContext, useState } from 'react'
import Fab from '@material-ui/core/Fab'
import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined'
import CloudDownloadIcon from '@material-ui/icons/CloudDownload'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import './ExportJson.css'
import { Dialog, Box, DialogContent , DialogTitle, IconButton, Button, DialogActions } from '@material-ui/core'
import { useDropzone } from 'react-dropzone'
import ShortcutsContext from '../App/ShortcutsContext'

const PrettyPrintJson = ({data}: { data: string }) => (<pre>{JSON.stringify(data, null, 2) }</pre>);

export const ExportJson = (): JSX.Element => {
  const { setAllShortcuts } = useContext(ShortcutsContext)
    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file: File) => {
          const reader = new FileReader()
    
          reader.onabort = () => console.log('file reading was aborted')
          reader.onerror = () => console.log('file reading has failed')
          reader.onload = () => {
          // Do whatever you want with the file contents
            if (reader.result) {
                const binaryStr = reader.result
                console.log(binaryStr)
                setCards(JSON.parse(binaryStr as string))
                setDataUpdated(true)
            }
          }
          reader.readAsText(file, "UTF-8");
        })
        
      }, [])

      const {getRootProps, getInputProps} = useDropzone({onDrop})

    const [showExport, setShowExport] = useState(false)
    const [dataUpdated, setDataUpdated] = useState(false)
    const [cards, setCards] = useState(localStorage.getItem('cards')
    // @ts-ignore-next-line
    ? JSON.parse(localStorage.getItem('cards'))
    : [])
    return (
        <div className="show_export_button">
            <Fab onClick={() => setShowExport(true)}>
                <CloudUploadOutlinedIcon />
                </Fab>
                <Dialog
                fullWidth
                maxWidth="lg"
                onBackdropClick={() => setShowExport(false)}
                    open={showExport}
                >
                    <DialogTitle>{"Stored data"}</DialogTitle>
                    <DialogContent className='json_content'>
                    <PrettyPrintJson data={cards} />
                    </DialogContent>
                    <DialogContent className='upload_container'>
                    <div {...getRootProps()} className="upload">
      <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files <IconButton><CloudUploadIcon /></IconButton></p>
    </div>
                    </DialogContent>
                    <Box m={2}>
                    <DialogActions>
                    <a
                    className="download_ref"
                    href={`data:text/json;charset=utf-8,${encodeURIComponent(
              JSON.stringify(cards)
            )}`}
            download="newTabData.json"
          >
          
                    <CloudDownloadIcon /></a>
                    <Button onClick={() => {
                        setShowExport(false)
                        setAllShortcuts(cards)
                    }}>{dataUpdated ? 'Save' : 'Close'}</Button>
                    </DialogActions>
                    </Box>
                </Dialog>
        </div>
    )
}