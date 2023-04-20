
import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, Divider, Grid, List, ListItem, ListItemText, Paper, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import Gold from '../../../../public/images/Gold.png'

import Silver from '../../../../public/images/Silver.png'
import Diamond from '../../../../public/images/Diamond.webp'
import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";


const stripe = require('stripe')('sk_test_51MeV74FbNTGaIf1ZOYgTZwHdrdWIZb1FfHkyG9He6RhCjUdXbpkzqLSUHJvEldX1VVPZ8UhlrUuyxLgu1RHMgEaI00qGjBik9J');



const stripePromise = loadStripe(
  'pk_test_51MeV74FbNTGaIf1Z315ReJ41QcUrNeGkknXOdfljWDRQV6zIfFLjqwS4nGQTWp56JF57Zsg5b4yJmDC8FtkhVRfq00USVRMSSp'
);


const Payment = () => {


  useEffect(() => {
    const fetchwebhook = async () => {
      const webhookEndpoint = await stripe.webhookEndpoints.retrieve(
        'we_1Mr79HFbNTGaIf1ZY1dZyyot'
      );
      console.log(webhookEndpoint);
    };
    fetchwebhook();

    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      console.log(stripePromise)
      console.log('Order placed! You will receive an email confirmation.')

    }

    if (query.get('canceled')) {
      console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
    }
  }, []);


  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Card sx={{ height: '100%', backgroundColor: 'gainsboro', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
            <CardHeader
              avatar={<Image src={Silver} alt='Gold' style={{ width: '60px', height: '60px', objectFit: 'cover' }} />}
              title='Silver'
              titleTypographyProps={{ style: { color: 'grey', fontSize: '30px' } }}
              sx={{ m: 1 }}
            />
            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
              <List>
                <ListItem>
                  <Typography variant='h5' sx={{ color: 'grey' }}>5 </Typography>
                  <Typography sx={{ ml: 2 }}>Users</Typography>
                </ListItem>
                <ListItem>
                  <Typography variant='h5' sx={{ color: 'grey' }}>10 </Typography>
                  <Typography sx={{ ml: 2 }}>Orders</Typography>
                </ListItem>
                <ListItem>
                  <Typography variant='h5' sx={{ color: 'grey' }}>50 </Typography>
                  <Typography sx={{ ml: 2 }}>Candidates</Typography>
                </ListItem>
                <ListItem>
                  <Typography variant='h4' sx={{ color: 'grey', fontWeight: 'bold' }}>$19/month</Typography>
                </ListItem>
              </List>
            </CardContent>
            <CardActions>

              <form action="/api/CheckoutSession" method="POST">
                <section>
                  <Button
                    type='submit'
                    fullWidth
                    variant='contained'
                    style={{ backgroundColor: 'grey' }}

                  >
                    Pay
                  </Button>
                </section>
              </form>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={4} >

          <Card sx={{ height: 450, backgroundColor: 'beige', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
            <CardHeader
              avatar={<Image src={Gold} alt='Gold' style={{ width: '60px', height: '60px', objectFit: 'cover' }} />}
              title='Gold'
              titleTypographyProps={{ style: { color: 'goldenrod', fontSize: '30px' } }}
              sx={{ m: 1 }}
            />
            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
              <List>
                <ListItem>
                  <Typography variant='h5' sx={{ color: 'goldenrod' }}>10 </Typography>
                  <Typography sx={{ ml: 2 }}>Users</Typography>
                </ListItem>
                <ListItem>
                  <Typography variant='h5' sx={{ color: 'goldenrod' }}>30 </Typography>
                  <Typography sx={{ ml: 2 }}>Orders</Typography>
                </ListItem>
                <ListItem>
                  <Typography variant='h5' sx={{ color: 'goldenrod' }}>50 </Typography>
                  <Typography sx={{ ml: 2 }}>Candidates</Typography>
                </ListItem>
                <ListItem>
                  <Typography variant='h4' sx={{ color: 'goldenrod', fontWeight: 'bold' }}>$39/month</Typography>
                </ListItem>
              </List>
            </CardContent>
            <CardActions>
              <Button fullWidth variant='contained' style={{ backgroundColor: 'goldenrod' }}>Pay</Button>
            </CardActions>
          </Card>

        </Grid>

        <Grid item xs={4}>
          <Card sx={{ height: 450, backgroundColor: 'dodgerblue', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
            <CardHeader
              avatar={<Image src={Diamond} alt='Diamond' style={{ width: '60px', height: '60px', objectFit: 'cover' }} />}
              title='Diamond'
              titleTypographyProps={{ style: { color: 'white', fontSize: '30px' } }}
              sx={{ m: 1 }}
            />
            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
              <List>
                <ListItem>
                  <Typography variant='h5' sx={{ color: 'white' }}>15 </Typography>
                  <Typography sx={{ ml: 2, color: 'white' }}>Users</Typography>
                </ListItem>
                <ListItem>
                  <Typography variant='h5' sx={{ color: 'white' }}>50 </Typography>
                  <Typography sx={{ ml: 2, color: 'white' }}>Orders</Typography>
                </ListItem>
                <ListItem>
                  <Typography variant='h5' sx={{ color: 'white' }}>100 </Typography>
                  <Typography sx={{ ml: 2, color: 'white' }}>Candidates</Typography>
                </ListItem>
                <ListItem>
                  <Typography variant='h4' sx={{ color: 'white', fontWeight: 'bold' }}>$59/month</Typography>
                </ListItem>
              </List>
            </CardContent>
            <CardActions>
              <Button fullWidth variant='contained' style={{ backgroundColor: 'white', color: 'royalblue' }}>Pay</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default Payment
