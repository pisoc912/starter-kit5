const stripe = require('stripe')(process.env.NEXT_STRIPE_SECRET_KEY);


export default async function handler(req, res) {
  if (req.method === 'POST') {
    const productId = 'PRODUCT_ID';
    const price = 'PRICE';
    const startDate = 'START_DATE';
    const endDate = 'END_DATE';

    // Handle a successful payment
    const handlePayment = (result) => {
      // Retrieve the payment intent ID and product name from the result
      console.log(result)

      // const stripeId = result.paymentIntent.id;
      // const productName = result.paymentIntent.metadata.productName;

      // // Use the retrieved values to do whatever you need
      // console.log('Payment successful!');
      // console.log(`Stripe ID: ${stripeId}`);
      // console.log(`Product Name: ${productName}`);
      // console.log(`Price: ${price}`);
      // console.log(`Start Date: ${startDate}`);
      // console.log(`End Date: ${endDate}`);
    };


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
        .then((result) => {
          handlePayment(result)
          console.log(result, session)
        })

    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
