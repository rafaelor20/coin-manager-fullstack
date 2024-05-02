import { Prisma } from '@prisma/client';
import { prisma } from '@/config';

async function getDebts(userId: number) {
  return prisma.debt.findMany({
    where: { userId: userId },
  });
}

async function getDebtById(id: number) {
  return prisma.debt.findUnique({
    where: { id: id },
  });
}

async function payDebtById(id: number, amount: number) {
  return prisma.debt.update({
    where: { id: id },
    data: { amount: amount },
  });
}

async function markAsPayedDebtById(id: number) {
  return prisma.debt.update({
    where: { id: id },
    data: { paid: true },
  });
}

async function storeDebt(data: Prisma.DebtUncheckedCreateInput) {
  return prisma.debt.create({ data });
}

const debtRepository = {
  getDebts,
  storeDebt,
  getDebtById,
  payDebtById,
  markAsPayedDebtById,
};

export default debtRepository;
