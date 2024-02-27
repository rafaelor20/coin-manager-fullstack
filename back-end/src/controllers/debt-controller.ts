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
    const { creditor, amount, payDate } = req.body;
    const debt = await debtService.storeDebt({ userId, creditor, amount, payDate });
    return res.status(httpStatus.CREATED).send(debt);
  } catch (error) {
    next(error);
  }
}

export async function removeDebt(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const { userId } = req;
    const debtId = Number(req.params.debtId);
    const debt = await debtService.removeDebt(userId, debtId);
    return res.status(httpStatus.OK).send(debt);
  } catch (error) {
    next(error);
  }
}
