import React from 'react'
import { Box, Button, Card, Grid, Typography, IconButton, Tooltip, ListItemAvatar, ListItem, Avatar, ListItemText, List, Tabs, Tab, Divider, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions } from '@mui/material'
import { useState, useEffect } from 'react'
import axios from 'axios'

import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import PopUpProfile from './PopUpProfile';
import PropTypes from 'prop-types';
import useSearch from 'src/@core/hooks/useSearch';



const Candidates = ({ data }) => {
  const [candidates, setCandidates] = useState([])

  // const API_URL1 = 'https://4f71frs7ni.execute-api.us-east-1.amazonaws.com/dev/talentsourcingrestapi-dev';
  const [openPopup, setOpenPopup] = useState(false)
  const now = new Date().toISOString()
  const [popupContent, setPopupContent] = useState([])
  const [value, setValue] = React.useState(0);
  const [marked, setMarked] = useState([])
  const [color, setColor] = useState('default')
  const [csvData, setCsvData] = useState([])
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [filteredData, handleSearch] = useSearch(csvData);



  // useEffect(() => {
  //   getData()
  // }, [])

  // const getData = async () => {
  //   const response = await axios.get(API_URL1)
  //   setCandidates(response.data.Items)
  //   console.log(response)

  // }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };



  // const handleDelete = async (id) => {
  //   try {
  //     return await axios.delete(`${API_URL}/${id}`),
  //       getData()
  //   } catch (error) {
  //     console.log("error while calling deleteUser api", error)
  //   }
  // };

  // const handleUpdate = async (id) => {
  //   try {
  //     return await axios.update(`${API_URL}/${id}`)

  //   } catch (error) {
  //     console.log("error while calling deleteUser api", error)
  //   }
  // };

  const showDetails = (candidate) => {
    setPopupContent([candidate])
    setOpenPopup(true)
  }

  return (
    <Box sx={{ height: "100%", width: '100%' }}>
      <Grid container>
        <Grid container spacing={3} sx={{ m: 5, justifyContent: 'space-around' }}>
          <Grid item xs={4.7}>
            Candidates
          </Grid>
          <Grid item xs={2.3}>
            Company
          </Grid>
          <Grid item xs={2}>
            Score
          </Grid>
          <Grid item xs={1.5}>
            Source
          </Grid>
          <Grid item xs={1.5}>
            Mark
          </Grid>
        </Grid>
        <Grid item xs={12}>
          {data.map((data, index) => (
            <Card key='idx' sx={{ m: 4, height: 80 }}>
              <Grid container justifyContent='center' alignItems='center' >
                <Grid item xs={5} >
                  <ListItem direction="row" alignItems="flex-start" justifyContent="center">
                    <ListItemAvatar>
                      <Avatar alt={data.PK} />
                    </ListItemAvatar>
                    <ListItemText
                      onClick={() => showDetails(data)}
                      primary={data.PK}
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {String(data.talent_location).substring(0, 10)} {data.talent_employment_current_position}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                </Grid>
                <Grid item xs={2} sx={{ alignItems: 'center', justifyItems: 'center' }}>
                  industry
                </Grid>
                <Grid item xs={2} sx={{ alignItems: 'center', justifyItems: 'center' }}>
                  company
                </Grid>
                <Grid item xs={1.5} sx={{ alignItems: 'center', justifyItems: 'center' }}>
                  company
                </Grid>
                <Grid item xs={1.5} sx={{ alignItems: 'center', justifyItems: 'center' }}>
                  <IconButton
                    aria-label="mark"
                    key={index}
                    color={marked === data ? 'error' : color}
                    onClick={() => {
                      if (marked === data) {
                        setMarked(null);
                        setColor('default');
                      } else {
                        setMarked(data);
                        setColor('secondary');
                      }
                    }
                    }
                  >
                    <ThumbUpIcon />
                  </IconButton>
                  <IconButton aria-label="Unmark">
                    <ThumbDownOffAltIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Card>
          ))}
        </Grid>
      </Grid>

    </Box>
  )
}

export default Candidates
