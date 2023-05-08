import React from 'react'
import { Box, Button, Card, Grid, Typography, IconButton, Tooltip, ListItemAvatar, ListItem, Avatar, ListItemText, List, Tabs, Tab, Divider, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Pagination, Stack, Chip, Link, Checkbox } from '@mui/material'
import { useState, useEffect } from 'react'
import axios from 'axios'

import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import PopUpProfile from './PopUpProfile';
import PropTypes from 'prop-types';
import useSearch from 'src/@core/hooks/useSearch';
import { AddLocation, LinkedIn } from '@mui/icons-material';
import clsx from 'clsx';
import TalentDialog from '../third-page/TalentDialog';



const Candidates = ({ data, isSearching }) => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const [checked, setChecked] = useState([]);

  const handleChange = (id) => {
    if (checked.includes(id)) {
      setChecked(checked.filter((cardId) => cardId !== id));
    } else {
      setChecked([...checked, id]);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);
  console.log(currentData)
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogData, setDialogData] = useState([]);

  const handleCardClick = (data) => {
    setDialogData([data]);
    setIsDialogOpen(true);

  }

  const handleClose = () => {
    setIsDialogOpen(false);
  }
  if (isSearching) {
    return <p>Loading...</p>;
  }


  return (
    <Box sx={{ height: "100%", width: '100%' }}>
      <Grid container>
        <Grid container spacing={3} sx={{ m: 5, justifyContent: 'space-around' }}>
          <Grid item xs={4}>
            Candidates
          </Grid>
          <Grid item xs={3}>
            Company
          </Grid>
          <Grid item xs={3}>
            Current Position
          </Grid>
          <Grid item xs={2}>
            Industry
          </Grid>
        </Grid>
        <Grid item xs={12}>
          {currentData.map((data, idx2) => (
            <Card key={idx2} sx={{ m: 4, height: 80 }} onClick={() => handleCardClick(data)}>
              <Grid container sx={{ justifyContent: 'center', alignItems: 'center' }} >
                <Grid item xs={4} >
                  <ListItem direction="row" alignItems="flex-start" justifyContent="center">
                    <Checkbox
                      checked={checked.includes(data._id)}
                      onChange={() => handleChange(data._id)}
                    />
                    <ListItemAvatar>
                      <Avatar alt={data.PK} />
                    </ListItemAvatar>

                    <ListItemText
                      primary={data._source.person_name}

                      secondary={
                        <Typography
                          sx={{ display: 'center' }}
                          component="span"
                          variant="body2"
                          color="grey"
                        >
                          {data._source.location_names_all}
                        </Typography>
                      }
                    />
                  </ListItem>
                </Grid>
                <Grid item xs={3} sx={{ alignItems: 'center', justifyItems: 'center' }}>
                  {data._source.position_company_name}
                </Grid>
                <Grid item xs={3} sx={{ alignItems: 'center', justifyItems: 'center' }}>
                  {data._source.job_history[0].position_name}
                </Grid>
                <Grid item xs={2} sx={{ alignItems: 'center', justifyItems: 'center' }}>
                  {data._source.industry_name}
                </Grid>
              </Grid>
            </Card>
          ))}
          <Pagination
            count={Math.ceil(data.length / itemsPerPage)}
            page={page}
            onChange={handleChangePage} />
        </Grid>
      </Grid>
      <TalentDialog open={isDialogOpen} onClose={handleClose} results={dialogData} />
    </Box>
  )
}

export default Candidates
