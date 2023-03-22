import { Box, Breadcrumbs, Button, Divider, Fab, Grid, Paper, styled, Stack, Tab, Tabs, Typography, emphasize, ButtonGroup } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import AddIcon from '@mui/icons-material/Add';
import React from 'react'

import Chip from '@mui/material/Chip';
import { withRouter } from 'next/router';
import { useRouter } from 'next/router';

const Header = () => {
  const router = useRouter()



  return (
    <Grid item xs={12} container>
      <Grid item xs={4}>
        <Typography variant='h4'>Find Candidates</Typography>
      </Grid>
      <Grid item xs={6}>
      </Grid>
      <Grid item xs={2}>
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Grid>

    </Grid>

  )
}


export default withRouter(Header);
