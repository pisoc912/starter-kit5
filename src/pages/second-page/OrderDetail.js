import { Business, BusinessCenter, CloseOutlined, Email, LinkedIn, LocationOn, Work } from '@mui/icons-material'
import { Avatar, Box, Button, Card, Dialog, Grid, IconButton, List, ListItem, ListItemIcon, ListItemText, TextField, Typography } from '@mui/material'
import { useState } from 'react';



const OrderDetail = ({ open, onClose, orderData }) => {

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth='lg'
    >
      {orderData.map((data, idx) => {
        return (
          <Card sx={{ height: 1000 }} key={idx}>
            <Grid container sx={{ height: 20, mt: 20, mb: 10, alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant='h6'>Order Detail</Typography>
              <Grid container sx={{ m: 2 }}>
                <Grid item xs={10} md={5} sx={{ m: 4, ml: 10 }}>
                  <TextField
                    disabled
                    label="Current Title"
                    variant="standard"
                    value={data.currentTitle}
                    fullWidth
                    name="currentTitle"
                  />
                </Grid>
                <Grid item xs={10} md={5} sx={{ m: 4, ml: 10 }}>
                  <TextField
                    disabled
                    label="Location Preference"
                    variant="standard"
                    value={data.locationPreference}
                    name="locationPreference"
                    fullWidth
                  />
                </Grid>

                <Grid item xs={10} md={5} sx={{ m: 4, ml: 10 }}>
                  <TextField
                    disabled
                    label="Years of Experience"
                    variant="standard"
                    value={data.yearsOfExperience}
                    name="yearsOfExperience"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={10} md={5} sx={{ m: 4, ml: 10 }}>
                  <TextField
                    disabled
                    label="Seniority Level"
                    variant="standard"
                    value={data.seniorityLevel}
                    name="seniorityLevel"
                    fullWidth
                  />
                </Grid>

                <Grid item xs={10} md={5} sx={{ m: 4, ml: 10 }}>
                  <TextField
                    disabled
                    label="Required Skills"
                    variant="standard"
                    value={data.requiredSkills}
                    name="requiredSkills"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={10} md={5} sx={{ m: 4, ml: 10 }}>
                  <TextField
                    disabled
                    label="Required Skills"
                    variant="standard"
                    value={data.requiredSkills}
                    name="prefereSkills"
                    fullWidth
                  />
                </Grid>

                <Grid item xs={10} md={5} sx={{ m: 4, ml: 10 }}>
                  <TextField
                    disabled
                    label="Industry"
                    variant="standard"
                    value={data.industry}
                    name="industry"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={10} md={5} sx={{ m: 4, ml: 10 }}>
                  <TextField
                    disabled
                    label="Education"
                    variant="standard"
                    value={data.education}
                    name="education"
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} sx={{ m: 4, ml: 10 }}>
                  <Typography>Additional Comment (eg.language skills,certificates,major, etc.)</Typography>
                  <Grid item xs={12} >
                    <TextField fullWidth multiline rows={7}></TextField>
                  </Grid>

                </Grid>



              </Grid>
              <Button onClick={() => onClose()}>Back</Button>
            </Grid>
          </Card>
        )
      })}
    </Dialog>
  )
}

export default OrderDetail
