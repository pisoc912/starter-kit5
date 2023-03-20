import { Dialog, DialogContent, DialogTitle, Typography } from '@mui/material'
import React from 'react'
import { useState } from 'react'

const PopUpProfile = (props) => {
  const { title, children, openPopup, setOpenPopup } = props

  const handleClose = () => {
    setOpenPopup(false)
  }

  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState('lg');

  const handleMaxWidthChange = (event) => {
    setMaxWidth(

      // @ts-expect-error autofill of arbitrary value is not handled.
      event.target.value,
    );
  };

  const handleFullWidthChange = (event) => {
    setFullWidth(event.target.checked);
  };


  return (
    <Dialog
      open={openPopup}
      onClose={handleClose}
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      PaperProps={{ sx: { width: "80%", height: "80%" } }}
    >
      <DialogTitle>
        <Typography>{title}</Typography>
      </DialogTitle>
      <DialogContent>
        {children}
      </DialogContent>
    </Dialog>
  )
}

export default PopUpProfile
