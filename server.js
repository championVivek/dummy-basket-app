const express = require("express");
const stripe = require("stripe")(
  "sk_test_51LD2E3FtHQ0cOdBLd75crbXJU5iEAe94dJm3YWFq8V6sPEAY7rrt9tTMd7YV3orGcu390Fn6lFLU2Sp0LuAGBWDT00voU2isPJ"
);
const {
  PlaidEnvironments,
  Configuration,
  PlaidApi,
  Products,
  CountryCode,
} = require("plaid");
const { body, validationResult, check } = require("express-validator");

const app = express();
const PORT = 3000 || process.env.PORT;

app.use(express.json());

const configuration = new Configuration({
  basePath: PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": "629f12a529827600127ece7b",
      "PLAID-SECRET": "8c0fde825a56b0a8b50705aa29816e",
    },
  },
});

const plaidClient = new PlaidApi(configuration);

app.post("/payment-intent", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      payment_method_types: ["card"],
      amount: 1,
      currency: "usd",
    });
    res.send(paymentIntent);
  } catch (e) {
    console.log(e);
  }
});

app.post("/search-customer", async (req, res) => {
  const email = req.body.email;
  const customer = await stripe.customers.search({
    query: `email:\'${email}\' `,
  });
  res.send(customer);
});

// Create for google pay and card
app.post("/create-payment-intent", async (req, res) => {
  try {
    const customerId = req.body.customerId;
    const paymentId = req.body.paymentId;
    const card = req.body.card;
    const paymentIntent = await stripe.paymentIntents.create({
      payment_method_types: ["card"],
      amount: 3 * 100,
      customer: customerId,
      ...(card && { payment_method: paymentId }),
      currency: "GBP",
      description: "Software development services",
      off_session: card,
      confirm: card,
      capture_method: "automatic",
    });
    res.send(paymentIntent);
  } catch (err) {
    res.status(err.statusCode).json({ error: err });
  }
});

app.post("/create-card", async (req, res) => {
  try {
    const tokenId = req.body.tokenId;
    const customerId = req.body.customerId;
    const card = await stripe.customers.createSource(customerId, {
      source: tokenId,
    });
    res.send(card);
  } catch (err) {
    res.status(err.statusCode).json({ error: err });
  }
});

app.post("/customer-create", async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const customer = await stripe.customers.create({
      name,
      email,
    });
    res.send(customer);
  } catch (e) {
    console.log(e);
  }
});

app.post("/get-customer-cards", async (req, res) => {
  try {
    const customerId = req.body.customerId;
    const paymentMethods = await stripe.paymentMethods.list({
      customer: customerId,
      type: "card",
    });
    res.send(paymentMethods);
  } catch (errors) {
    console.log(errors);
  }
});

app.post("/payment-sheet", async (req, res) => {
  try {
    const customerId = req.body.customerId;
    const cardHolderName = req.body.cardHolderName;
    const ephemeralKey = await stripe.ephemeralKeys.create(
      {
        customer: customerId,
      },
      { apiVersion: "2020-08-27" }
    );
    const setupIntent = await stripe.setupIntents.create({
      customer: customerId,
      metadata: {
        cardHolderName: cardHolderName,
      },
    });
    res.json({
      setupIntent: setupIntent.client_secret,
      cardHolderName: setupIntent.metadata.cardHolderName,
      ephemeralKey: ephemeralKey.secret,
      customer: customerId,
      publishableKey:
        "pk_test_51LD2E3FtHQ0cOdBLL2kpyynQghtmMUs1PtYssGpREC9GrQYAgJBuU6zNBzMWYQGghx87mbrTPK7E5yCnpjRjB1YN00USMPG7lF",
    });
  } catch (e) {
    console.log(e);
  }
});

app.post(
  "/plaid-payment-receipt-create",
  check("bacs.account")
    .trim()
    .isLength({
      min: 1,
      max: 10,
    })
    .withMessage("Account number must be at least 10 characters long"),
  check("iban")
    .optional({ checkFalsy: true })
    .isLength({ min: 15, max: 34 })
    .withMessage("Iban be at least 15 chars long and max 34"),
  body("name").isString().trim(),
  check("bacs.sort_code")
    .trim()
    .isLength({
      min: 6,
      max: 6,
    })
    .withMessage("Sort code must be 6 characters long"),

  async (req, res, next) => {
    const name = req.body.name;
    const iban = req.body.iban;
    const bacs = req.body.bacs;
    try {
      const errors = validationResult(req);
      if (errors.length > 0) {
        throw new Error(`${errors.errors[0].msg}`);
      }
      const response = await plaidClient.paymentInitiationRecipientCreate({
        name,
        ...(bacs?.account?.trim() && { bacs: bacs }),
        ...(iban?.trim() && iban),
      });
      res.send(response.data);
    } catch (err) {
      res.status(400).json({
        message: err.message,
      });
    }
  }
);

app.post("/plaid-payment-create", async (req, res) => {
  try {
    const recipient_id = req.body.recipient_id;
    const client_name = req.body.client_name;
    const currency = req.body.currency;
    const value = req.body.value;
    const response = await plaidClient.paymentInitiationPaymentCreate({
      recipient_id: recipient_id,
      reference: "TestPayment",
      amount: {
        currency: currency,
        value: value,
      },
      client_id: "629f12a529827600127ece7b",
      secret: "8c0fde825a56b0a8b50705aa29816e",
    });
    const paymentID = response.data.payment_id;
    const configs = {
      user: {
        // This should correspond to a unique id for the current user.
        client_user_id: "user-id",
      },
      client_name: client_name,
      products: [Products.PaymentInitiation],
      language: "en",
      webhook: "https://webhook.sample.com",
      country_codes: [CountryCode.Gb],
      payment_initiation: {
        payment_id: paymentID,
      },
      android_package_name: "com.bskt",
    };
    const createTokenResponse = await plaidClient.linkTokenCreate(configs);
    res.json(createTokenResponse.data);
  } catch (error) {
    res
      .status(err?.response?.status)
      .json({ error_type: err.response.data.error_type });
  }
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
