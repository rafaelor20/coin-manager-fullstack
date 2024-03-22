import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getHistoric, storeTransaction, deleteTransaction } from '@/controllers/transaction-controller';

const transactionRouter = Router();

transactionRouter
  .all('/*', authenticateToken)
  .get('/historic', getHistoric)
  .post('/store', storeTransaction)
  .delete('/delete/:transactionId', deleteTransaction);

export { transactionRouter };
