import { Credit } from '@prisma/client';
import moment from 'moment';
import {
  unauthorizedError,
  invalidAmountError,
  invalidPayDateError,
  invalidDebtorError,
  invalidCreditIdError,
} from '@/errors';
import creditRepository from '@/repositories/credit-repository';
import userRepository from '@/repositories/user-repository';
import transactionService from '@/services/transaction-service';

function checkCreditIdIsNumber(value: any) {
  if (typeof value !== 'number' || isNaN(value)) {
    throw invalidCreditIdError();
  }
}

async function checkUserIdByCreditId(userId: number, creditId: number) {
  const credit = await creditRepository.getCreditById(creditId);
  if (!credit) {
    throw invalidCreditIdError();
  }
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

async function getAllCredits(userId: number) {
  return creditRepository.getAllCredits(userId);
}

async function storeCredit({ userId, description, debtor, amount, payDate }: CreateCreditParams) {
  checkUserById(userId);
  checkAmount(amount);
  checkPayDate(payDate);
  isValidDebtor(debtor);
  amount = Number(amount);
  return creditRepository.storeCredit({ userId, debtor, amount, payDate, description });
}

async function getCreditById(userId: number, creditId: number) {
  await checkUserIdByCreditId(userId, creditId);
  const credit = await creditRepository.getCreditById(creditId);
  return credit;
}

async function removeCredit(userId: number, creditId: number) {
  await checkUserIdByCreditId(userId, creditId);
  return creditRepository.removeCreditById(creditId);
}

async function partialPayment(credit: Credit, amount: number) {
  const newAmount = credit.amount - amount;
  return creditRepository.updateCreditAmount(credit.id, newAmount);
}

async function fullPayment(credit: Credit) {
  return creditRepository.payCredit(credit.id);
}

async function creditPayment(userId: number, creditId: number, payment: number) {
  checkCreditIdIsNumber(creditId);
  checkAmount(payment);
  const credit = await getCreditById(userId, creditId);
  let Credit;
  if (credit.amount > payment) {
    Credit = await partialPayment(credit, payment);
  } else {
    Credit = await fullPayment(credit);
  }
  const Transaction = await transactionService.storeTransaction({
    userId,
    description: `Payment of credit ${Credit.id}`,
    amount: Credit.amount,
    entity: Credit.debtor,
  });
  return { Credit, Transaction };
}

export type CreateCreditParams = Pick<Credit, 'userId' | 'debtor' | 'amount' | 'payDate' | 'description'>;

const creditService = {
  getCredits,
  getAllCredits,
  storeCredit,
  getCreditById,
  removeCredit,
  creditPayment,
};

export default creditService;
