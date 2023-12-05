const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.post("/payment", (req, res) => {
    const amountInCents = req.body.amount * 100;

    console.log("Received payment request:", req.body); // Log the received payment request

    stripe.charges.create(
        {
            source: req.body.tokenId,
            amount: amountInCents,
            currency: "inr",
        },
        (stripeErr, stripeRes) => {
            if (stripeErr) {
                console.error("Stripe Error:", stripeErr);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                console.log("Stripe Response:", stripeRes);
                res.status(200).json(stripeRes);
            }
        }
    );
});

module.exports = router;
