// Using Express
const express = require('express');
const app = express();
app.use(express.json());

const { Configuration, PlaidApi, PlaidEnvironments } = require('plaid');

const configuration = new Configuration({
  basePath: PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
      'PLAID-SECRET': process.env.PLAID_SECRET,
    },
  },
});

const client = new PlaidApi(configuration);

app.post('/api/create_link_token', async function (request, response) {
  try {
    // Get the client_user_id by searching for the current user
    const clientUserId = request.user.id; // Ensure you have a valid user object from request

    // Fetch the user from the database (use your specific method to find the user)
    const user = await User.findById(clientUserId); // Change to findById or your specific method

    // Check if the user exists
    if (!user) {
      return response.status(404).json({ error: 'User not found' });
    }

    const linkTokenRequest = { // Renamed to avoid conflict with the request parameter
      user: {
        client_user_id: user.id, // Use user.id since you have the user object
      },
      client_name: 'Plaid Test App',
      products: ['auth'],
      language: 'en',
      webhook: 'https://webhook.example.com',
      redirect_uri: 'https://domainname.com/oauth-page.html',
      country_codes: ['US'],
    };

    // Create the link token
    const createTokenResponse = await client.linkTokenCreate(linkTokenRequest);
    response.json(createTokenResponse.data); // Send back the link token
  } catch (error) {
    console.error(error); // Log the error for debugging
    response.status(500).json({ error: 'Unable to create link token' }); // Send an error response
  }
});

app.post('/api/exchange_public_token', async function (
  request,
  response,
  next,
) {
  const publicToken = request.body.public_token;
  try {
    const response = await client.itemPublicTokenExchange({
      public_token: publicToken,
    });

    // These values should be saved to a persistent database and
    // associated with the currently signed-in user
    const accessToken = response.data.access_token;
    const itemID = response.data.item_id;

    res.json({ public_token_exchange: 'complete' });
  } catch (error) {
    // handle error
  }
});