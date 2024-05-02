import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import debtService from '@/services/debt-service';

export async function getDebts(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const { userId } = req;
    const debts = await debtService.getDebts(userId);
    return res.status(httpStatus.OK).send(debts);
  } catch (error) {
    next(error);
  }
}

export async function getDebtById(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const { userId } = req;
    const debtId = Number(req.params.debtId);
    const debt = await debtService.getDebtById(userId, debtId);
    return res.status(httpStatus.OK).send(debt);
  } catch (error) {
    next(error);
  }
}

export async function storeDebt(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const { userId } = req;
    const { creditor, description, amount, payDate } = req.body;
    const debt = await debtService.storeDebt({ userId, creditor, description, amount, payDate });
    return res.status(httpStatus.CREATED).send(debt);
  } catch (error) {
    next(error);
  }
}

export async function payDebt(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const { userId } = req;
    const debtId = Number(req.params.debtId);
    const payment = Number(req.body.payment);
    const debt = await debtService.payDebtById(userId, debtId, payment);
    return res.status(httpStatus.OK).send(debt);
  } catch (error) {
    if (error.message === 'No result for this search!') {
      return res.status(httpStatus.NOT_FOUND).send({ message: error.message });
    }
    next(error);
  }
}
