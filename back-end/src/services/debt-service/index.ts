import { UserDebt } from '@prisma/client';
import moment from 'moment';
import { unauthorizedError, invalidAmountError, invalidCreditorError, invalidPayDateError } from '@/errors';
import debtRepository from '@/repositories/debt-repository';
import userRepository from '@/repositories/user-repository';

async function checkUserIdByDebtId(userId: number, debtId: number) {
  const debt = await debtRepository.getDebtById(debtId);
  if (debt.userId !== userId) {
    throw unauthorizedError();
  }
}

async function checkUserById(id: number) {
  const user = await userRepository.findById(id);
  if (!user) {
    throw unauthorizedError();
  }
}

function checkAmount(amount: number) {
  amount = Number(amount);
  if (typeof amount !== 'number' || isNaN(amount)) {
    throw invalidAmountError();
  }
}

function checkPayDate(payDate: Date) {
  if (payDate !== null && !moment(payDate).isSameOrAfter(moment(), 'day')) {
    throw invalidPayDateError();
  }
}

function isValidCreditor(creditor: string) {
  if (typeof creditor !== 'string') {
    throw invalidCreditorError();
  }
  if (creditor.trim() === '') {
    throw invalidCreditorError();
  }
}

async function getDebts(userId: number) {
  return debtRepository.getDebts(userId);
}

async function storeDebt({ userId, creditor, amount, payDate }: CreateDebtParams) {
  checkUserById(userId);
  checkAmount(amount);
  checkPayDate(payDate);
  isValidCreditor(creditor);
  amount = Number(amount);
  return debtRepository.storeDebt({ userId, creditor, amount, payDate });
}

async function getDebtById(userId: number, debtId: number) {
  await checkUserIdByDebtId(userId, debtId);
  return debtRepository.getDebtById(debtId);
}

async function removeDebt(userId: number, debtId: number) {
  await checkUserIdByDebtId(userId, debtId);
  return debtRepository.removeDebtById(debtId);
}

export type CreateDebtParams = Pick<UserDebt, 'userId' | 'creditor' | 'amount' | 'payDate'>;

const debtService = {
  getDebts,
  storeDebt,
  removeDebt,
  getDebtById,
};

export default debtService;
