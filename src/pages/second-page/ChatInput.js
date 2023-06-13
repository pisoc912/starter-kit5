import { Button, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import Upload from './Upload'

const ChatInput = ({ value, onChange, onSubmit }) => {
  const [file, setFile] = useState(null)

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0]
    setFile(droppedFile)
  }

  const handleFileUpload = (event) => {
    const uploadFile = event.target.files[0]
    setFile(uploadFile)
  }

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', minHeight: '64px', alignItems: 'center', px: 4 }}>
        <TextField sx={{ flex: 1, bgcolor: "white", m: 2 }} color='secondary' onChange={onChange} value={value} />
        <Button onClick={onSubmit} variant='contained' >Send</Button>

      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', minHeight: '64px', alignItems: 'center', px: 4 }}>
        <TextField
          type="file"
          sx={{ flex: 1, m: 2 }}
          inputProps={{
            accept: '.txt,.pdf,.docx', // 可接受的文件类型
            onChange: handleFileUpload,
          }}
        />
        <Button variant="outlined" color="primary" onClick={handleFileUpload}>
          Upload
        </Button>
        {file && (
          <div>
            <Typography>File:{file.name}</Typography>
          </div>)}
      </Box>
    </div>
  )
}

export default ChatInput
