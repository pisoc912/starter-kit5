// ** MUI Imports
import { Button, Card, Hidden, Box, Stack, ButtonGroup, Divider } from '@mui/material'
import Grid from '@mui/material/Grid'



import { useState } from 'react'
import ThirdPage from '../third-page'
import Header from './components/Header'




const Home = () => {
  const [active, setActive] = useState("TalentPool")

  return (
    <Grid container spacing={6}>
      {/* <Header />

      <Grid item xs={12}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
          mb: 6
        }}
      >
        <ButtonGroup variant="text" aria-label="text button group">
          <Button onClick={() => setActive("TalentPool")}>Talent Pool</Button>
          <Button onClick={() => setActive("Candidates")}>Candidates</Button>
          <Button onClick={() => setActive("Details")}>Details</Button>
        </ButtonGroup>
      </Grid>
      <Divider /> */}
      <ThirdPage />
      {/* <Grid container>
        {active === "TalentPool" && <TalentPoolFull />}
        {active === "Candidates" && <CandidatesFull />}

      </Grid> */}

    </Grid>
  )
}

export default Home
