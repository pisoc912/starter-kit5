import * as React from 'react'
import { useState, useEffect } from 'react'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'

const StripeContainer = () => {
  const [clients, setClients] = useState([])

  const stripe = require('stripe')(
    'sk_test_51MeV74FbNTGaIf1ZOYgTZwHdrdWIZb1FfHkyG9He6RhCjUdXbpkzqLSUHJvEldX1VVPZ8UhlrUuyxLgu1RHMgEaI00qGjBik9J'
  )
  console.log(stripe)

  function unsubscribe(id) {
    const deleted = stripe.customers.del(id)
  }

  function create(id) {
    const customer = stripe.customers.create({
      name: 'default',
      description: 'My First Test Customer (created for API docs at https://www.stripe.com/docs/api)'
    })
  }

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const customers = await stripe.customers.list({
          limit: 3
        })
        const customerList = customers.data
        console.log('Clients list get', customerList)
        setClients(customerList)
      } catch (error) {
        console.log('error ', error)
      }
    }
    fetchClients()
  }, [])



  return (
    <div>
      {clients.map(client => {
        return (
          <div key={name}>
            <Card item xs={12}>
              <CardContent>{client.name}</CardContent>
              <CardActions>
                <Button
                  size='small'
                  onClick={() => {
                    stripe.customers.del(client.id)
                    alert('clicked')
                  }}
                >
                  unsubscribe
                </Button>
              </CardActions>
            </Card>
          </div>
        )
      })}
    </div>
  )
}

export default StripeContainer
