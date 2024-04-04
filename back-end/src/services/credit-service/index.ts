import { Credit } from '@prisma/client';
import moment from 'moment';
import { unauthorizedError, invalidAmountError, invalidPayDateError, invalidDebtorError } from '@/errors';
import creditRepository from '@/repositories/credit-repository';
import userRepository from '@/repositories/user-repository';

async function checkUserIdByCreditId(userId: number, creditId: number) {
  const credit = await creditRepository.getCreditById(creditId);
  if (credit.userId !== userId) {
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

function isValidDebtor(debtor: string) {
  if (typeof debtor !== 'string') {
    throw invalidDebtorError();
  }
  if (debtor.trim() === '') {
    throw invalidDebtorError();
  }
}

async function getCredits(userId: number) {
  return creditRepository.getCredits(userId);
}

async function storeCredit({ userId, debtor, amount, payDate }: CreateCreditParams) {
  checkUserById(userId);
  checkAmount(amount);
  checkPayDate(payDate);
  isValidDebtor(debtor);
  amount = Number(amount);
  return creditRepository.storeCredit({ userId, debtor, amount, payDate });
}

async function getCreditById(userId: number, creditId: number) {
  await checkUserIdByCreditId(userId, creditId);
  return creditRepository.getCreditById(creditId);
}

async function removeCredit(userId: number, creditId: number) {
  await checkUserIdByCreditId(userId, creditId);
  return creditRepository.removeCreditById(creditId);
}

export type CreateCreditParams = Pick<Credit, 'userId' | 'debtor' | 'amount' | 'payDate'>;

const creditService = {
  getCredits,
  storeCredit,
  getCreditById,
  removeCredit,
};

export default creditService;
