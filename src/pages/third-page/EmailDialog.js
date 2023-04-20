import React, { useState } from 'react'
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';

const EmailDialog = (props) => {
  const { open, handleClose } = props

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth='lg'>
      <DialogTitle>Send Email</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin='normal'
          label='To:'
          type='email'
          fullWidth
          variant='standard'

        />
        <TextField
          autoFocus
          margin='normal'
          label='From:'
          type='email'
          fullWidth
          variant='standard'

        />
        <TextField
          autoFocus
          margin='dense'
          label='Subject:'
          type='email'
          fullWidth
          variant='standard'

        />
        <TextField
          autoFocus
          margin='dense'
          variant='standard'
          label='Email Content'
          fullWidth

        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant='contained' color='primary'>
          Send
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EmailDialog
