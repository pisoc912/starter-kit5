import { Avatar, Box, Stack } from '@mui/material'
import React from 'react'


const ChatMessages = ({ messages = [] }) => {
  return (
    <Box sx={{ height: "75%" }}>
      {messages.map((message, id) => {
        return (
          <div key={id} style={{ backgroundColor: message.sender === 'User' ? 'white' : '#ede7f6', color: message.sender === 'User' ? 'primary' : '#787EFF' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mx: 4, paddingY: 6, paddingX: 4 }}>
              <Stack direction='row'>
                {message.sender === 'User' ? <Avatar src='/images/avatars/1.png' alt='user' /> : <Avatar src='/images/apple-touch-icon.png' alt='user' />}
                <Box sx={{ px: 2, mx: 4 }}>{message.content}</Box>
              </Stack>
            </Box>
          </div>
        );
      })}
    </Box>
  )
}

export default ChatMessages
