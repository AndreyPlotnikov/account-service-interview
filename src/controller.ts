import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import pool from './db';


export const createAccount = async (req: Request, res: Response) => {
  const { userId, balance, currency } = req.body;
  const id = uuidv4();

  const query = `INSERT INTO accounts (id, "userId", balance, currency) VALUES ('${id}', '${userId}', ${balance}, '${currency}') RETURNING *`;

  try {
    const result = await pool.query(query);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getAccountById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const query = `SELECT * FROM accounts WHERE id = '${id}'`;

  try {
    const result = await pool.query(query);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Account not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const createTransaction = async (req: Request, res: Response) => {
  const { accountId, type, amount, currency } = req.body;
  const id = uuidv4();
  const createdAt = new Date().toISOString();

  try {
    const transactionQuery = `INSERT INTO transactions (id, "accountId", type, amount, currency, "createdAt") VALUES ('${id}', '${accountId}', '${type}', ${amount}, '${currency}', '${createdAt}') RETURNING *`;
    const transactionResult = await pool.query(transactionQuery);
    const updateAccountQuery = `UPDATE accounts SET balance = balance + ${amount} WHERE id = '${accountId}'`;
    await pool.query(updateAccountQuery);

    res.status(201).json(transactionResult.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getTransactionById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const query = `SELECT * FROM transactions WHERE id = '${id}'`;

  try {
    const result = await pool.query(query);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getTransactionsForAccount = async (req: Request, res: Response) => {
  const { id } = req.params;
  const query = `SELECT * FROM transactions WHERE "accountId" = '${id}' ORDER BY "createdAt" DESC`;

  try {
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
