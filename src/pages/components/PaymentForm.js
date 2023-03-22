import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import axios from 'axios'
import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import { Button, FormGroup } from '@mui/material'

const PaymentForm = () => {
  const [success, setSuccess] = useState(false)
  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement)
    })


    if (!error) {
      try {
        const { id } = paymentMethod

        const response = await axios.post("http://localhost:4000/payment", {
          amount: 10000,
          id
        })
        if (response.data.success) {
          console.log("successful payment")
          setSuccess(true)
        }
      } catch (error) {
        console.log("error:", error.message)
      }
    } else {
      console.log(error.message)
    }
  }

  return (
    <>
      {!success ?
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <fieldset className='FormGroup'>
              <CardElement options={CARD_OPTIONS} />
            </fieldset>
          </FormGroup>
          <Button>Pay</Button>
        </form>
        :
        <div>
          <h2>You just bought a spatula congrets</h2>
        </div>
      }
    </>
  )
}


export default PaymentForm
