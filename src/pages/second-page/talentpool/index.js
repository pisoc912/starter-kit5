// ** MUI Imports
import { Button, Card, Hidden, Box, Stack, ButtonGroup, Divider } from '@mui/material'
import Grid from '@mui/material/Grid'



import { useState, useEffect } from 'react'
import CandidatesFull from '../../components/CandidatesFull'
import Header from '../../components/Header'
import TalentPoolFull from '../../components/TalentPoolFull'
import { API, graphqlOperation, Storage } from 'aws-amplify'

import useSearch from 'src/@core/hooks/useSearch'
import { listCandidateListings } from 'src/graphql/queries'



const Home = () => {
  const [active, setActive] = useState("TalentPool")
  const [orderData, setOrderData] = useState([])


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await API.graphql(graphqlOperation(listCandidateListings));
      console.log("list", response)
      setOrderData(response.data.listCandidateListings.items);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <Grid container spacing={6}>
      <Header />

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
      <Divider />

      <Grid container>
        {active === "TalentPool" && <TalentPoolFull orderData={orderData} />}
        {active === "Candidates" && <CandidatesFull orderData={orderData} />}

      </Grid>

    </Grid>
  )
}

export default Home
