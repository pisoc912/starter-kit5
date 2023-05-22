import { Button, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const ChatInput = ({ value, onChange, onSubmit }) => {


  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', minHeight: '64px', alignItems: 'center', px: 4 }}>
      <TextField sx={{ flex: 1, bgcolor: "white", m: 2 }} color='secondary' onChange={onChange} value={value} />
      <Button onClick={onSubmit} variant='contained' >Send</Button>
    </Box>
  )
}

export default ChatInput
