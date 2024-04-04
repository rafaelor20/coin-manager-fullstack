import { Prisma } from '@prisma/client';
import { prisma } from '@/config';

async function getCredits(userId: number) {
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

const creditRepository = {
  getCredits,
  storeCredit,
  getCreditById,
  removeCreditById,
};

export default creditRepository;
