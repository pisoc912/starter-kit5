// ** MUI Imports
import { Button, Card, Hidden, Box, Stack, ButtonGroup, Divider } from '@mui/material'
import Grid from '@mui/material/Grid'



import { useState } from 'react'
import ThirdPage from '../third-page'
import Header from './components/Header'
import Payment from './components/Payment'




const Home = () => {
  const [active, setActive] = useState("TalentPool")

  return (
    <Grid container spacing={6}>

      <Payment />


    </Grid>
  )
}

export default Home
