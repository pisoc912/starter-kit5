import React from 'react'
import { Box, Button, Card, Grid, Paper, TableCell, TableRow, styled, Table, TableHead, Typography, IconButton, Tooltip } from '@mui/material'
import { useState, useEffect } from 'react'
import axios from 'axios'
import EditIcon from '@mui/icons-material/Edit';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ClearIcon from '@mui/icons-material/Clear';
import { useRouter } from 'next/router';




const TalentPool = (search) => {
  const [candidates, setCandidates] = useState([])
  const API_URL = 'https://kasek7o0kk.execute-api.us-west-2.amazonaws.com/test';
  const [user, setUser] = useState("")

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const response = await axios.get(API_URL)
    setCandidates(response.data.Items)

  }

  const handleDelete = async (id) => {
    try {
      return await axios.delete(`${API_URL}/${id}`),
        getData()
    } catch (error) {
      console.log("error while calling deleteUser api", error)
    }
  };

  const handleUpdate = async (id) => {
    try {
      return await axios.update(`${API_URL}/${id}`)

    } catch (error) {
      console.log("error while calling deleteUser api", error)
    }
  };




  return (
    <Box sx={{ height: "100%", width: '100%' }}>

      {/* <Card scrollSnapType='y' overflowX='scroll' scrollSnapAlign='start' sx={{ height: "100%" }}> */}
      <Grid container xs={12} >
        <Grid item xs={12}>
          {candidates
            .map(user => (
              <Card key={user.id} sx={{ m: 4, mt: 0, height: 100 }}>
                <Typography sx={{ m: 4, mt: 4, mb: 1 }} variant='h5'>{user.currentTitle}</Typography>
                <Grid container xs={12} sx={{ m: 4, mt: 2, mb: 4 }} direction="row" justifyContent='center' alignItems='center'>
                  <Grid item xs={2}>
                    date
                  </Grid>
                  <Grid item xs={2}>
                    ShortList
                  </Grid>
                  <Grid item xs={5}>
                    Candidates:{user.locationPreference}
                  </Grid>
                  <Grid item xs={3}>
                    <Tooltip title="Edit">
                      <IconButton onClick={() => handleUpdate()}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Mark">
                      <IconButton>
                        <BookmarkIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="More">
                      <IconButton>
                        <MoreVertIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="More">
                      <IconButton onClick={() => handleDelete(user.id)}>
                        <ClearIcon />
                      </IconButton>
                    </Tooltip>
                  </Grid>
                </Grid>
              </Card>
            ))}
          <Grid item xs={12}>
          </Grid>
        </Grid>
      </Grid>

      {/* </Card> */}

    </Box>
  )
}

export default TalentPool
