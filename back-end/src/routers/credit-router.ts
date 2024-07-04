import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getCredits, getCreditById, storeCredit, removeCredit, creditPayment } from '@/controllers/credit-controller';

const creditRouter = Router();

creditRouter
  .all('/*', authenticateToken)
  .get('/', getCredits)
  .get('/:creditId', getCreditById)
  .post('/store', storeCredit)
  .delete('/delete/:creditId', removeCredit)
  .post('/payment/:creditId', creditPayment);

export { creditRouter };
