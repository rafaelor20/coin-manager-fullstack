import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getCredits, getCreditById, storeCredit, removeCredit } from '@/controllers/credit-controller';

const creditRouter = Router();

creditRouter
  .all('/*', authenticateToken)
  .get('/', getCredits)
  .get('/:creditId', getCreditById)
  .post('/store', storeCredit)
  .delete('/delete/:creditId', removeCredit);

export { creditRouter };
