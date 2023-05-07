import { Box, Button, Card, Grid, List, ListItem, ListItemText, Typography, MenuItem, Divider, Hidden, Drawer, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Accordion, AccordionSummary, AccordionDetails, Chip } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import Candidates from './Candidates'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import themeConfig from 'src/configs/themeConfig'
import { styled, useTheme } from '@mui/material/styles'

const CandidatesFull = ({ orderData }) => {
  const theme = useTheme();
  const [selectedData, setSelectedData] = useState([])

  const handleClick = (data) => {
    setSelectedData([data])
    console.log("clicked", data)
  }

  return (
    <Grid container spacing={6}>
      <Hidden mdDown>
        <Grid item xs={3} >
          <Card>
            <Accordion sx={{ backgroundColor: `rgba(${theme.palette.customColors.main}, 0.06)` }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography variant='h6' sx={{ color: theme.palette.primary.main, m: 3 }}>View Order Details</Typography>
              </AccordionSummary>
              <AccordionDetails >
                {orderData.map((data, idx1) => {
                  return (
                    <Chip key={idx1}
                      size='medium'
                      label={data.PK}
                      color={'primary'}
                      sx={{ my: 1.5, '& .MuiChip-label': { px: 2.5, lineHeight: 1.385, textTransform: 'capitalize' } }}
                      onClick={() => handleClick(data)}
                    />
                  )
                })}
              </AccordionDetails>
            </Accordion>
            <Box sx={{ m: 2, mt: 6, overflowY: 'hidden' }}>
              <List component='div'>
                <ListItemText>Sort</ListItemText>
              </List>
              <Button fullWidth sx={{ textAlign: 'start', justifyContent: 'flex-start' }}> Score</Button>
              <Divider />
              <Button fullWidth sx={{ textAlign: 'start', justifyContent: 'flex-start' }}>Experience</Button>

            </Box>
          </Card>
        </Grid>
      </Hidden>
      <Grid item xs={12} md={9}>
        <Candidates data={selectedData} />
      </Grid>
    </Grid>
  )
}

export default CandidatesFull
