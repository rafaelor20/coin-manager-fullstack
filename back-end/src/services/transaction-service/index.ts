import { Transaction } from '@prisma/client';
import { unauthorizedError, invalidAmountError, invalidDescriptionError, notFoundError } from '@/errors';
import transactionRepository from '@/repositories/transaction-repository';
import userRepository from '@/repositories/user-repository';

async function checkUserById(id: number) {
  const user = await userRepository.findById(id);
  if (!user) {
    throw unauthorizedError();
  }
}

async function checkTransactionById(id: number) {
  const transaction = await transactionRepository.findById(id);
  if (!transaction) {
    throw unauthorizedError();
  }
}

function checkAmount(amount: number) {
  amount = Number(amount);
  if (typeof amount !== 'number' || isNaN(amount)) {
    throw notFoundError();
  }
}

function isValidDescription(debtor: string) {
  if (typeof debtor !== 'string') {
    throw invalidDescriptionError();
  }
  if (debtor.trim() === '') {
    throw invalidDescriptionError();
  }
}

async function getHistoric(userId: number) {
  return transactionRepository.getHistoric(userId);
}

async function storeTransaction({ userId, description, amount, category }: CreateTransactionParams) {
  checkUserById(userId);
  checkAmount(amount);
  isValidDescription(description);
  amount = Number(amount);
  return transactionRepository.storeTransaction({ userId, description, amount, category });
}

async function deleteTransaction({ userId, transactionId }: DeleteTransactionParams) {
  checkUserById(userId);
  checkTransactionById(transactionId);
  return transactionRepository.deleteTransaction({ transactionId });
}

export type CreateTransactionParams = Pick<Transaction, 'userId' | 'description' | 'amount' | 'category'>;

const transactionService = {
  getHistoric,
  storeTransaction,
  deleteTransaction,
};

export default transactionService;
