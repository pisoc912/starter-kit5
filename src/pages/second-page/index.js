// ** MUI Imports
import { Button, Card, Hidden, Box, Stack, ButtonGroup, Divider } from '@mui/material'
import Grid from '@mui/material/Grid'



import { useState, useEffect } from 'react'
import CandidatesFull from '../component/CandidatesFull'
import Header from '../component/Header'
import TalentPoolFull from '../component/TalentPoolFull'
import { Storage } from 'aws-amplify'

import useSearch from 'src/@core/hooks/useSearch'



const Home = () => {
  const [active, setActive] = useState("TalentPool")
  const [csvData, setCsvData] = useState([])
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [filteredData, handleSearch] = useSearch(csvData);


  useEffect(() => {
    getCsvData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };



  const getCsvData = async () => {
    try {
      Storage.configure({ region: 'us-west-1' })
      const listResponse = await Storage.list('talentsource/')

      const fileKey = listResponse.results[1].key


      const file = await Storage.get(fileKey, {
        level: 'public',
        contentType: 'text/csv'
      })
      const response = await fetch(file)
      const text = await response.text()

      const rows = text.split('\n')

      const headers = rows[0].split(',')

      const csvData = rows.slice(1).map(row => {
        const values = row.split(',');
        const obj = {};

        values.forEach((value, index) => {
          value = value.replace(/"/g, "").trim();
          obj[headers[index]] = value;
        });

        return obj;
      });

      setCsvData(csvData);
    } catch (error) {
      console.error(error)
    }
  }

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
        {active === "TalentPool" && <TalentPoolFull csvData={csvData} filteredData={filteredData} />}
        {active === "Candidates" && <CandidatesFull />}

      </Grid>

    </Grid>
  )
}

export default Home
