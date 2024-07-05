import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getDebts, getAllDebts, getDebtById, storeDebt, deleteDebt, debtPayment } from '@/controllers/debt-controller';

const debtRouter = Router();

debtRouter
  .all('/*', authenticateToken)
  .get('/', getDebts)
  .get('/all', getAllDebts)
  .get('/:debtId', getDebtById)
  .post('/store', storeDebt)
  .delete('/delete/:debtId', deleteDebt)
  .post('/payment/:debtId', debtPayment);

export { debtRouter };
