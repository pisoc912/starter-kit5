import { Business, BusinessCenter, Email, LinkedIn, LocationOn, Work } from '@mui/icons-material'
import { Avatar, Box, Button, Dialog, Grid, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material'
import { useState } from 'react';
import EmailDialog from './EmailDialog';



const TalentDialog = ({ open, onClose, results }) => {

  const [openEmail, setOpenEmail] = useState(false);
  const [emailContent, setEmailContent] = useState('');

  const handleOpen = () => setOpenEmail(true);
  const handleClose = () => setOpenEmail(false);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth='lg'
    >
      {results.map((data, idx) => {
        return (
          <Grid container key={idx}>
            <Grid item xs={6} sx={{ mt: 6 }}>
              <Grid
                container
                direction="column"
                justifyContent="space-around"
                alignItems="center"
                fullWidth
              >
                <List sx={{ padding: 5 }}>
                  <ListItem>
                    <Avatar alt='Name'
                      sx={{
                        fontSize: '2rem',
                        width: '6rem',
                        height: '6rem',
                        display: 'flex',
                        ml: "40%",
                        mr: "40%",
                        mb: 4,
                        textTransform: 'uppercase'
                      }}>
                      {data._source.first_name.charAt(0)}{data._source.last_name.charAt(0)}
                    </Avatar>
                  </ListItem>
                  <ListItem sx={{ mb: 10 }}>
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                      <Typography variant='h6' sx={{ textAlign: 'center' }}>
                        {data._source.person_name}
                      </Typography>
                    </Box>
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <LocationOn color='primary' />
                    </ListItemIcon>
                    <ListItemText
                      primary="Location: "
                      secondary={data._source.location_names_all}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Business color='primary' />
                    </ListItemIcon>
                    <ListItemText
                      primary="Industry Name: "
                      secondary={data._source.industry_name}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <LinkedIn color='primary' />
                    </ListItemIcon>
                    <ListItemText
                      primary="LinkedIn: "
                      secondary={
                        <a href={data._source.linkedin_url} target="_blank" rel="noopener noreferrer">
                          {data._source.linkedin_url}
                        </a>}

                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Company Keywords"
                      secondary={data._source.company_keywords.map(keyword => (
                        <span key={keyword}>{keyword}<br /></span>))}
                    />

                  </ListItem>
                  <Button
                    sx={{ mt: 10 }}
                    fullWidth
                    variant='contained'
                    onClick={handleOpen} >
                    Mail me
                  </Button>
                  <EmailDialog
                    open={openEmail}
                    handleClose={handleClose}
                  />

                </List>
              </Grid>
            </Grid>
            <Grid item xs={6} sx={{ mt: 6 }}>
              <Grid
                container
                direction="column"
                justifyContent="space-around"
                alignItems="stretch"
              >
                <List sx={{ padding: 5 }}>
                  <ListItem sx={{ mb: 10 }}>
                    <Typography variant='h6' sx={{ textAlign: 'center' }}>Job Experience</Typography>
                  </ListItem>

                  <ListItem>
                    <ListItemIcon>
                      <img src={data._source.company_logo_url} alt='company_logo_url' height="40" width="40" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Company Name: "
                      secondary={data._source.position_company_name}
                    />
                  </ListItem>

                  <ListItem>
                    <ListItemIcon>
                      <Work color={data._source.job_history[0].is_current ? 'primary' : 'default'} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Still Working: "
                      secondary={data._source.job_history[0].is_current ? 'True' : 'False'} />
                  </ListItem>

                  <ListItem>
                    <ListItemIcon>
                      <BusinessCenter color='primary' />
                    </ListItemIcon>
                    <ListItemText
                      primary="Current Position: "
                      secondary={data._source.job_history[0].position_name} />
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </Grid>
        )
      })}
    </Dialog>
  )
}

export default TalentDialog
