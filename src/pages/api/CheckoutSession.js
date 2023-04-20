

const stripe = require('stripe')(process.env.NEXT_STRIPE_SECRET_KEY);

const express = require('express');

const router = express.Router();

const handler = async (req, res) => {

  if (req.method === 'POST') {
    try {
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price: 'price_1MoAVTFbNTGaIf1ZTDEekkvn',
            quantity: 1,
          },
        ],
        mode: 'subscription',
        success_url: `${req.headers.origin}/home/?success=true`,
        cancel_url: `${req.headers.origin}/home`,
        automatic_tax: { enabled: true },
      })
      res.redirect(303, session.url)
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }

  //Stripe Webhook
  const endpointSecret = 'whsec_645cbb489cebb248a04d8ccc09446e954d1ddb842469538acc0814eb23ded51c'
  router.post('/webhook', express.raw({ type: 'application/json' }), (request, response) => {
    let event = request.body;

    if (endpointSecret) {
      // Get the signature sent by Stripe
      const signature = request.headers['stripe-signature'];
      try {
        event = stripe.webhooks.constructEvent(
          request.body,
          signature,
          endpointSecret
        );
        console.log("webhook verified")
      } catch (err) {
        console.log(`⚠️  Webhook signature verification failed.`, err.message);

        return response.sendStatus(400);
      }
    }

    // Handle the event
    // switch (event.type) {
    //   case 'payment_intent.succeeded':
    //     const paymentIntent = event.data.object;
    //     console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);

    //     break;
    //   case 'payment_method.attached':
    //     const paymentMethod = event.data.object;

    //     break;
    //   default:
    //     // Unexpected event type
    //     console.log(`Unhandled event type ${event.type}.`);
    // }

    // Return a 200 response to acknowledge receipt of the event
    response.send();
  });

}

export default handler;
