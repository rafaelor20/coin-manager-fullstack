import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import {
  getCredits,
  getAllCredits,
  getCreditById,
  storeCredit,
  removeCredit,
  creditPayment,
} from '@/controllers/credit-controller';

const creditRouter = Router();

creditRouter
  .all('/*', authenticateToken)
  .get('/', getCredits)
  .get('/all', getAllCredits)
  .get('/:creditId', getCreditById)
  .post('/store', storeCredit)
  .delete('/delete/:creditId', removeCredit)
  .post('/payment/:creditId', creditPayment);

export { creditRouter };
