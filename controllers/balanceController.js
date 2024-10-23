const { plaidClient } = require('./path-to-your-plaid-client'); // Make sure to import your Plaid client

// Fetch Account Balances
exports.getAccountBalances = async (req, res) => {
  const { accessToken } = req.body; // Access token from the request body

  // Prepare the request for fetching account balances
  const request = {
    access_token: accessToken, // Use the access token provided by the client
  };

  try {
    // Call the Plaid API to get account balances
    const response = await plaidClient.accountsBalanceGet(request);
    const accounts = response.data.accounts; // Extract accounts from the response
    res.json(accounts); // Respond with the account balances
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: 'Unable to fetch account balances' }); // Handle error response
  }
};
