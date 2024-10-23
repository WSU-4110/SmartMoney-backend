const express = require('express');
const { getAccountBalances } = require('./path-to-your-BalanceController');

const app = express();

app.use(express.json()); // Middleware to parse JSON request bodies

// Route to get account balances
app.post('/api/account_balances', getAccountBalances);

// Start your server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
