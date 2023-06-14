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
  const [isSearching, setIsSearching] = useState(false)
  const [selectedPK, setSelectedPK] = useState('');



  const handleClick = async (PK, SK) => {
    setIsSearching(true);
    if (selectedPK === PK) {
      setSelectedPK('');
    } else {
      setSelectedPK(PK);
    }

    const requestOptions = {
      method: 'GET'
    };

    try {
      const response = await fetch(`https://a2mwnnax40.execute-api.us-west-1.amazonaws.com/test/candidate?pk=${encodeURIComponent(PK)}&sk=${encodeURIComponent(SK)}`, requestOptions);
      const data = await response.json();
      console.log(data.hits.hits)
      setSelectedData(data.hits.hits);
      setIsSearching(false);
    } catch (error) {
      console.error('Error fetching search results:', error);
      setIsSearching(false);
    }
  };



  return (
    <Grid container spacing={6}>
      <Hidden mdDown>
        <Grid item xs={3} >
          <Card>
            <Accordion defaultExpanded sx={{ backgroundColor: `rgba(${theme.palette.customColors.main}, 0.06)` }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
              >
                <Typography variant='h6' sx={{ color: theme.palette.primary.main, m: 3 }}>View Order Details</Typography>
              </AccordionSummary>
              <AccordionDetails defaultExpanded>
                {orderData.map((data, idx1) => {
                  return (
                    <Chip key={idx1}
                      size='medium'
                      label={`No. ${data.PK.substring(4, 12)} ${data.industry}`}
                      color={selectedPK == data.PK ? 'success' : 'primary'}
                      sx={{ my: 1.5, lineHeight: 3, textTransform: 'capitalize' }}
                      onClick={() => handleClick(data.PK, data.SK)}
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
        <Candidates data={selectedData} isSearching={isSearching} />
      </Grid>
    </Grid>
  )
}

export default CandidatesFull
