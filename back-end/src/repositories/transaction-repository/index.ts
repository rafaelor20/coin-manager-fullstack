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

const transactionRepository = {
  getHistoric,
  storeTransaction,
};

export default transactionRepository;
