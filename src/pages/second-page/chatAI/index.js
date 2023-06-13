import { Fullscreen } from '@mui/icons-material'
import { Box, Button, Card, CardContent, CardHeader, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import Chat from '../Chat'

const roles = [
  'Business Intelligence Analyst',
  'Data Analyst',
  'Compliance Analyst',
  'Customer Service Representative',
  'Help Desk Specialist',
  'Data Scientist',
  'Executive Assistant',
  'Chief of Staff',
  'Financial Analyst',
  'Accountant',
  'Recruitment Specialist',
  'Systems Analyst',
  'IT Support Specialist',
  'Legal Assistant',
  'Marketing Coordinator',
  'Content Specialist',
  'Supply Chain Specialist',
  'Product Analyst',
  'Project Coordinator',
  'Business Analyst',
  'Development Engineer',
  'Account Executive'
];

const ChatAI = () => {
  const [showChat, setShowChat] = useState(false)
  const [role, setRole] = useState('')


  const handleButtonClick = (role) => {
    setShowChat(true)
    setRole(role)
  }

  return (
    <div style={{ height: '100%' }}>
      {showChat ? (
        <Chat onClose={setShowChat} role={role} />
      ) : (
        <Grid container spacing={3}>
          {roles.map((role) => (
            <Grid item xs={3} key={role}>
              <Card sx={{ p: 4, minHeight: 200, display: 'flex', flexDirection: 'column', bgcolor: '#fafafa' }}>
                <CardContent>
                  <Typography variant='h5' style={{ textAlign: 'center', color: '#9155FD' }}>
                    {role}
                  </Typography>
                </CardContent>
                <Box sx={{ mt: 'auto', p: 1, display: 'flex', justifyContent: 'center' }}>
                  <Button variant='outlined' onClick={() => handleButtonClick(role)}>Start Chat Here</Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>

  )
}

export default ChatAI
