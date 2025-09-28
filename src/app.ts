import express from 'express';
import dotenv from 'dotenv';
import {
  createAccount,
  getAccountById,
  createTransaction,
  getTransactionById,
  getTransactionsForAccount
} from './controller';

dotenv.config();

const app = express();
app.use(express.json());

// Account routes
app.post('/accounts', createAccount);
app.get('/accounts/:id', getAccountById);

// Transaction routes
app.post('/transactions', createTransaction);
app.get('/transactions/:id', getTransactionById);
app.get('/accounts/:id/transactions', getTransactionsForAccount);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
