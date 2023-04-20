import React from 'react'
import { Box, Button, Card, Grid, Typography, IconButton, Tooltip, ListItemAvatar, ListItem, Avatar, ListItemText, List, Tabs, Tab, Divider, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions } from '@mui/material'
import { useState, useEffect } from 'react'
import axios from 'axios'

import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import PopUpProfile from './PopUpProfile';
import PropTypes from 'prop-types';
import useSearch from 'src/@core/hooks/useSearch';



const Candidates = () => {
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

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.PropTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
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
          {filteredData
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .filter((data) => Object.values(data).every((value) => value !== "N/A"))

            .map((data, index) => (
              <Card key='idx' sx={{ m: 4, height: 80 }}>
                <Grid container justifyContent='center' alignItems='center' >
                  <Grid item xs={5} >
                    <ListItem direction="row" alignItems="flex-start" justifyContent="center">
                      <ListItemAvatar>
                        <Avatar alt={data.talent_person_name} src="/images/avatar/1.png" />
                      </ListItemAvatar>
                      <ListItemText
                        onClick={() => showDetails(data)}
                        primary={data.talent_person_name}
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
                    {data.company_industry}
                  </Grid>
                  <Grid item xs={2} sx={{ alignItems: 'center', justifyItems: 'center' }}>
                    {data.company_keywords}
                  </Grid>
                  <Grid item xs={1.5} sx={{ alignItems: 'center', justifyItems: 'center' }}>
                    {data.talent_employment_current_company_name}
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
                <PopUpProfile
                  openPopup={openPopup}
                  setOpenPopup={setOpenPopup}
                >
                  <div>
                    {popupContent.map(user => {
                      return (
                        <Grid container key={user.id} >
                          <Grid container spacing={2} direction="column" alignItems="center">
                            <Grid item xs={2} sx={{ mt: 6 }}>
                              <Avatar alt='Ki' sx={{ height: 100, width: 100 }} src='/images/avatars/1.png' />
                            </Grid>
                            <Grid item>
                              <Typography variant='h5'>{user.name}</Typography>
                            </Grid>
                            <Grid item>
                              <Typography>{user.currentTitle}</Typography>
                            </Grid>
                            <Grid container sx={{ ml: 4, mt: 4 }}>
                              <>
                                <List>
                                  <ListItem>
                                    <ListItemText
                                      primary="Email: "
                                      secondary={user.email}
                                    />
                                  </ListItem>
                                  <ListItem>
                                    <ListItemText
                                      primary="Address: "
                                      secondary={user.address}
                                    />
                                  </ListItem>
                                  <ListItem>
                                    <ListItemText
                                      primary="Phone: "
                                      secondary={user.phone}
                                    />
                                  </ListItem>
                                  <ListItem>
                                    <ListItemText
                                      primary="Other social Media: "
                                      secondary=""
                                    />
                                  </ListItem>
                                  <ListItem>
                                    <ListItemText
                                      primary="Notes: "
                                      secondary="good"
                                    />

                                  </ListItem>
                                  <Button sx={{ mt: 10 }} fullWidth variant='contained' >Mail me</Button>

                                </List>
                              </>
                            </Grid>
                          </Grid>
                          <Grid container={8} direction="column">
                            <Grid item>
                              <Box sx={{ width: '80%' }}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                  <Tabs value={value} onChange={handleChange} centered>
                                    <Tab label="Information" {...a11yProps(0)} />
                                    <Tab label="Portfolio" {...a11yProps(1)} />
                                  </Tabs>
                                </Box>

                                <TabPanel value={value} index={0}>
                                  <Typography variant='h6' sx={{ mt: 4, mb: 4 }}>Work Experience</Typography>
                                  <Grid container direction='row' >
                                    <Grid item xs={1.5} sx={{ height: 150 }} md={0}>
                                      <Avatar alt='Logo' src="/images/avatars/google-logo.png" sx={{ height: 70, width: 70 }} />
                                    </Grid>
                                    <Grid container>
                                      <Grid item xs={9}>
                                        <Typography variant='body'>{user.currentTitle}</Typography>
                                      </Grid>
                                      <Grid item xs={2}>2019-Present</Grid>
                                      <Grid item xs={2}><Typography color='lightGrey'>Google</Typography></Grid>
                                      <Grid item xs={10}><Typography color='lightGrey'>New York</Typography></Grid>
                                      <Grid item xs={12}>
                                        <Typography>Discourse intended to give a mental image of something experienced beautiful beyond gave an accurate description of what he saw.:a statement or account giving the  characteristics of something:</Typography>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                  <Divider />
                                  <Grid container xs={12} direction='row' >
                                    <Grid item xs={1.5} sx={{ height: 150 }} md={0}>
                                      <Avatar alt='Logo' src="/images/avatars/appleLogo.png" sx={{ height: 70, width: 70 }} />
                                    </Grid>
                                    <Grid container>
                                      <Grid item xs={9}>
                                        <Typography variant='body'>{user.currentTitle}</Typography>
                                      </Grid>
                                      <Grid item xs={2}>2017-2019</Grid>
                                      <Grid item xs={2}><Typography color='lightGrey'>Apple</Typography></Grid>
                                      <Grid item xs={10}><Typography color='lightGrey'>New York</Typography></Grid>
                                      <Grid item xs={12}>
                                        <Typography>Discourse intended to give a mental image of something experienced beautiful beyond gave an accurate description of what he saw.:a statement or account giving the  characteristics of something:</Typography>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                  <Divider />
                                  <Typography variant='h6' sx={{ mt: 4, mb: 4 }}>Education Experience</Typography>
                                  <Grid container direction='row' >
                                    <Grid item xs={1.5} sx={{ height: 150 }} md={0}>
                                      <Avatar alt='Logo' src="/images/avatars/NYU-Logo.png" sx={{ height: 70, width: 70, borderRadius: 0 }} />
                                    </Grid>
                                    <Grid container>
                                      <Grid item xs={9}>
                                        <Typography variant='body'>New York University</Typography>
                                      </Grid>
                                      <Grid item xs={2}>2015-2017</Grid>
                                      <Grid item xs={2}><Typography color='lightGrey'>Master</Typography></Grid>
                                      <Grid item xs={10}><Typography color='lightGrey'>New York</Typography></Grid>
                                      <Grid item xs={12}>
                                        <Typography>Discourse intended to give a mental image of something experienced beautiful beyond gave an accurate description of what he saw.:a statement or account giving the  characteristics of something:</Typography>
                                      </Grid>
                                    </Grid>
                                  </Grid>s
                                </TabPanel>


                                <TabPanel value={value} index={1} >
                                  <Typography sx={{ height: 800 }} variant='h6'>Work Experience</Typography>
                                </TabPanel>
                              </Box>
                            </Grid>
                          </Grid>
                        </Grid>
                      )
                    })}
                  </div>
                </PopUpProfile>
              </Card>
            ))}
        </Grid>
      </Grid>

    </Box>
  )
}

export default Candidates
