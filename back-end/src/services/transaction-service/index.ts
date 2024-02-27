import { Transaction } from '@prisma/client';
import { unauthorizedError, invalidAmountError, invalidDescriptionError } from '@/errors';
import transactionRepository from '@/repositories/transaction-repository';
import userRepository from '@/repositories/user-repository';

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

export type CreateTransactionParams = Pick<Transaction, 'userId' | 'description' | 'amount' | 'category'>;

const transactionService = {
  getHistoric,
  storeTransaction,
};

export default transactionService;
