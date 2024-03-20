import { Prisma } from '@prisma/client';
import { prisma } from '@/config';

async function getHistoric(userId: number) {
  return prisma.transaction.findMany({
    where: { userId: userId },
  });
}

async function storeTransaction(data: Prisma.TransactionUncheckedCreateInput) {
  return prisma.transaction.create({ data });
}

async function findById(id: number) {
  return prisma.transaction.findUnique({
    where: { id },
  });
}

async function deleteTransaction(data: { transactionId: number }) {
  return prisma.transaction.delete({
    where: { id: data.transactionId },
  });
}

const transactionRepository = {
  getHistoric,
  storeTransaction,
  findById,
  deleteTransaction,
};

export default transactionRepository;
