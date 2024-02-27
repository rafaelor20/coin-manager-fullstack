import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getDebts, getDebtById, storeDebt, removeDebt } from '@/controllers/debt-controller';

const debtRouter = Router();

debtRouter
  .all('/*', authenticateToken)
  .get('/', getDebts)
  .get('/:debtId', getDebtById)
  .post('/store', storeDebt)
  .delete('/delete/:debtId', removeDebt);

export { debtRouter };
