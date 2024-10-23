// Use import instead of require
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';  // Ensure the .js extension
import authRoutes from './routes/authRoutes.js';  // Ensure the .js extension
// import expenseRoutes from './routes/expenseRoutes.js';  // Uncomment and update when needed
import plaidRoutes from './routes/plaidRoutes.js';  // Ensure the .js extension

// Initialize dotenv to load environment variables
dotenv.config();

// Initialize the Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware to parse JSON
app.use(express.json());


app.use(express.json());  // Middleware to parse JSON
app.use(express.urlencoded({ extended: true }));  // Middleware to parse URL-encoded data

// Define routes
app.use('/api/auth', authRoutes);
// app.use('/api', expenseRoutes);  // Uncomment when needed
app.use('/api/plaid', plaidRoutes);  // Plaid integration routes

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 

