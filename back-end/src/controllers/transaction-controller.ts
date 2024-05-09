import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import transactionService from '@/services/transaction-service';

export async function getHistoric(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const { userId } = req;
    const historic = await transactionService.getHistoric(userId);
    return res.status(httpStatus.OK).send(historic);
  } catch (error) {
    next(error);
  }
}

export async function storeTransaction(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const { userId } = req;
    const { description, amount, entity } = req.body;
    const transaction = await transactionService.storeTransaction({ userId, description, amount, entity });
    return res.status(httpStatus.CREATED).send(transaction);
  } catch (error) {
    next(error);
  }
}

export async function deleteTransaction(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const { userId } = req;
    const transactionId = Number(req.params.transactionId);
    await transactionService.deleteTransaction(userId, transactionId);
    return res.status(httpStatus.OK).send();
  } catch (error) {
    next(error);
  }
}
