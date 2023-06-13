import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'

const Upload = () => {
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

    <div onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}>
      {file ? (
        <div>
          <h2>File:</h2>
          <Typography>{file.name}</Typography>
        </div>
      ) : (
        <div>
          <TextField
            type="file"
            sx={{ flex: 1 }}
            inputProps={{
              accept: '.txt,.pdf,.docx', // 可接受的文件类型
              onChange: handleFileUpload,
            }}
          />
          <Button variant="contained" color="primary" onClick={handleFileUpload}>
            上传
          </Button>
        </div>
      )}
    </div>

  )
}

export default Upload
