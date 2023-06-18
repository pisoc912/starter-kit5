import { Button, Card, CardContent, Divider, Fab, Grid, IconButton, List, ListItemButton, ListItemIcon, ListItemText, TextField } from '@mui/material'

import React from 'react'
import { useState, useEffect } from 'react'
import Form from './Form'

import Icon from 'src/@core/components/icon'
import EmailIcon from '@mui/icons-material/Email';
import DraftsIcon from '@mui/icons-material/Drafts';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import Orders from '../second-page/Orders'


const TalentPoolFull = (props) => {
  const { orderData } = props
  const [active, setActive] = useState("")
  const [search, setSearch] = useState("")


  return (
    <Grid container>
      <Grid item xs={3.5}>
        <div>
          <Card sx={{ height: 600 }}>
            <CardContent sx={{ mt: 4, alignItems: 'center', justifyItems: 'center' }}>
              <TextField fullWidth onChange={(e) => setSearch(e.target.value)}></TextField>
            </CardContent>

            <Divider />

            <Grid item xs={12} container >
              <Grid item xs={7} md={7} sx={{ ml: 4, mt: 1 }}>
                <Icon sx={{ fontSize: 40 }} icon="ri:align-left" />
              </Grid>
              <Button xs={2} sx={{ alignItems: 'flex-end' }} variant='contained'>search</Button>
            </Grid>

            <Divider />

            <List sx={{ p: 3 }}>

              <ListItemButton onClick={() => setActive("NewOrder")}>
                <ListItemIcon>
                  <AddToPhotosIcon />
                </ListItemIcon>
                <ListItemText primary="New Order" />
              </ListItemButton>
            </List>
            <Divider />

            <List sx={{ p: 3 }}>
              <ListItemButton onClick={() => setActive("Active")}>
                <ListItemIcon>
                  <EmailIcon />
                </ListItemIcon>
                <ListItemText primary="Active" />
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon>
                  <DraftsIcon />
                </ListItemIcon>
                <ListItemText primary="Archied" />
              </ListItemButton>
            </List>
            <Divider />

            <List sx={{ p: 3 }}>
              <ListItemButton>
                <ListItemIcon>
                  <BookmarkAddIcon />
                </ListItemIcon>
                <ListItemText primary="Reorder" />
              </ListItemButton>
            </List>

            <Divider />

          </Card>
        </div>
      </Grid>
      <Grid item xs={8}>
        {active === "NewOrder" && <Form close={setActive} />}
        {active === "Active" && <Orders close={setActive} data={orderData} />}
        {!active && <Orders close={setActive} data={orderData} />}
      </Grid>
    </Grid>
  )
}

export default TalentPoolFull
