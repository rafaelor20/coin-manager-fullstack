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

async function deleteDebtById(id: number) {
  return prisma.debt.delete({
    where: { id: id },
  });
}

async function storeDebt(data: Prisma.DebtUncheckedCreateInput) {
  return prisma.debt.create({ data });
}

async function updateDebtAmount(id: number, amount: number) {
  return prisma.debt.update({
    where: { id: id },
    data: { amount: amount },
  });
}

async function payDebt(id: number) {
  return prisma.debt.update({
    where: { id: id },
    data: { paid: true },
  });
}

const debtRepository = {
  getDebts,
  storeDebt,
  getDebtById,
  deleteDebtById,
  updateDebtAmount,
  payDebt,
};

export default debtRepository;
