import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import creditService from '@/services/credit-service';

export async function getCredits(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const { userId } = req;
    const credits = await creditService.getCredits(userId);
    return res.status(httpStatus.OK).send(credits);
  } catch (error) {
    if (error.message === 'UnauthorizedError') {
      return res.status(httpStatus.UNAUTHORIZED).send({ error: error.message });
    }
    return res.status(httpStatus.BAD_REQUEST).send({ error: error.message });
  }
}

export async function getCreditById(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const { userId } = req;
    const creditId = Number(req.params.creditId);
    const credit = await creditService.getCreditById(userId, creditId);
    return res.status(httpStatus.OK).send(credit);
  } catch (error) {
    next(error);
  }
}

export async function storeCredit(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const { userId } = req;
    const { debtor, amount, payDate } = req.body;
    const credit = await creditService.storeCredit({ userId, debtor, amount, payDate });
    return res.status(httpStatus.CREATED).send(credit);
  } catch (error) {
    next(error);
  }
}

export async function removeCredit(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const { userId } = req;
    const creditId = Number(req.params.creditId);
    const credit = await creditService.removeCredit(userId, creditId);
    return res.status(httpStatus.OK).send(credit);
  } catch (error) {
    next(error);
  }
}
