import { LinkedIn, Twitter, Web } from '@mui/icons-material'
import { Avatar, Button, Card, CardContent, Link, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'
import React, { useState } from 'react'
import TalentDialog from './TalentDialog'

const TalentSource = ({ results }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogData, setDialogData] = useState([]);

  const handleCardClick = (data) => {
    setDialogData([data]);
    setIsDialogOpen(true);

  }

  const handleClose = () => {
    setIsDialogOpen(false);
  }

  return (
    <div>
      {results?.map((result, idx) => {
        return (
          <div key={idx}>
            <Card sx={{ minHeight: 100, mb: 2, display: 'flex' }} onClick={() => handleCardClick(result)}>
              <ListItem direction='row' alignItems='center' justifyContent='center' sx={{ width: '30%' }}>
                <ListItemAvatar>
                  <Avatar alt={result._source.person_name} src='/images/avatar/1.png' />
                </ListItemAvatar>
                <ListItemText
                  primary={result._source.person_name}
                  secondary={
                    <React.Fragment>
                      <Typography sx={{ display: 'inline' }} component='span' variant='body2' color='text.primary'>
                        {String(result._source.location_names_all)}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>

              <CardContent sx={{ flex: '1 0 auto', width: '20%', display: 'flex', alignItems: 'center' }}>
                <Typography component='div' variant='h8'>
                  {result._source.industry_name}
                </Typography>
              </CardContent>
              <CardContent sx={{ flex: '1 0 auto', width: '20%', display: 'flex', alignItems: 'center' }}>
                <Typography component='div' variant='h8'>
                  {result._source.position_company_name}
                </Typography>
              </CardContent>
              <CardContent sx={{ flex: '1 0 auto', width: '10%', display: 'flex', alignItems: 'center' }}>
                <Link href={result._source.linkedin_url}>
                  <LinkedIn />
                </Link>
              </CardContent>
              <CardContent sx={{ flex: '1 0 auto', width: '10%', display: 'flex', alignItems: 'center' }}>
                <Link href={result._source.company_twitter_url}>
                  <Twitter />
                </Link>
              </CardContent>
            </Card>
          </div>
        )
      })}
      <TalentDialog open={isDialogOpen} onClose={handleClose} results={dialogData} />
    </div>
  )
}

export default TalentSource
