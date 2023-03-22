import { Box, Button, Card, Grid, List, ListItem, ListItemText, Typography, MenuItem, Divider, Hidden, Drawer, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import Candidates from './Candidates'

const CandidatesFull = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid container spacing={6} xs={12}>
      <Hidden mdDown>
        <Grid item xs={3}>
          <Card sx={{ p: 8, height: "100%", mt: 4 }}>
            <Button fullWidth sx={{ height: 70, mt: 5 }} variant='contained' onClick={handleClickOpen}>
              View Order Details
            </Button>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Subscribe</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  To subscribe to this website, please enter your email address here. We
                  will send updates occasionally.
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Email Address"
                  type="email"
                  fullWidth
                  variant="standard"
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleClose}>Subscribe</Button>
              </DialogActions>
            </Dialog>
            <Box sx={{ m: 2, mt: 6, overflowY: 'hidden' }}>
              <List component='div'>
                <ListItemText>Sort</ListItemText>
              </List>
              <Button fullWidth sx={{ textAlign: 'start', justifyContent: 'flex-start' }}> Score</Button>
              <Divider />
              <Button fullWidth sx={{ textAlign: 'start', justifyContent: 'flex-start' }}>Experience</Button>

            </Box>
            <Box sx={{ m: 2, mt: 8, mb: 10, overflowY: 'hidden' }}>
              <List component='div'>
                <ListItemText>Sort</ListItemText>
              </List>
              <Button fullWidth sx={{ textAlign: 'start', justifyContent: 'flex-start' }}>Score</Button>
              <Divider />
              <Button fullWidth sx={{ textAlign: 'start', justifyContent: 'flex-start' }}>Experience</Button>

            </Box>
          </Card>
        </Grid>
      </Hidden>
      <Grid item xs={12} md={9}>
        <Candidates />
      </Grid>
    </Grid>
  )
}

export default CandidatesFull
