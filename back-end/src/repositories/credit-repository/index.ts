import { Prisma } from '@prisma/client';
import { prisma } from '@/config';

async function getCredits(userId: number) {
  return prisma.credit.findMany({
    where: { userId: userId, paid: false },
  });
}

async function getAllCredits(userId: number) {
  return prisma.credit.findMany({
    where: { userId: userId },
  });
}

async function getCreditById(id: number) {
  return prisma.credit.findUnique({
    where: { id: id },
  });
}

async function removeCreditById(id: number) {
  return prisma.credit.delete({
    where: { id: id },
  });
}

async function storeCredit(data: Prisma.CreditUncheckedCreateInput) {
  return prisma.credit.create({ data });
}

async function updateCreditAmount(id: number, amount: number) {
  return prisma.credit.update({
    where: { id: id },
    data: { amount: amount },
  });
}

async function payCredit(id: number) {
  return prisma.credit.update({
    where: { id: id },
    data: { paid: true },
  });
}

const creditRepository = {
  getCredits,
  getAllCredits,
  storeCredit,
  getCreditById,
  removeCreditById,
  updateCreditAmount,
  payCredit,
};

export default creditRepository;
