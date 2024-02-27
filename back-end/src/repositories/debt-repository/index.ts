import { Prisma } from '@prisma/client';
import { prisma } from '@/config';

async function getDebts(userId: number) {
  return prisma.userDebt.findMany({
    where: { userId: userId },
  });
}

async function getDebtById(id: number) {
  return prisma.userDebt.findUnique({
    where: { id: id },
  });
}

async function removeDebtById(id: number) {
  return prisma.userDebt.delete({
    where: { id: id },
  });
}

async function storeDebt(data: Prisma.UserDebtUncheckedCreateInput) {
  return prisma.userDebt.create({ data });
}

const debtRepository = {
  getDebts,
  storeDebt,
  getDebtById,
  removeDebtById,
};

export default debtRepository;
