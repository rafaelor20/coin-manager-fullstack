import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getHistoric, storeTransaction } from '@/controllers/transaction-controller';

const transactionRouter = Router();

transactionRouter.all('/*', authenticateToken).get('/historic', getHistoric).post('/store', storeTransaction);

export { transactionRouter };
