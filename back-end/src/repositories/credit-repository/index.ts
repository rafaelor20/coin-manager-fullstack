import { Prisma } from '@prisma/client';
import { prisma } from '@/config';

async function getCredits(userId: number) {
  return prisma.userCredit.findMany({
    where: { userId: userId },
  });
}

async function getCreditById(id: number) {
  return prisma.userCredit.findUnique({
    where: { id: id },
  });
}

async function removeCreditById(id: number) {
  return prisma.userCredit.delete({
    where: { id: id },
  });
}

async function storeCredit(data: Prisma.UserCreditUncheckedCreateInput) {
  return prisma.userCredit.create({ data });
}

const creditRepository = {
  getCredits,
  storeCredit,
  getCreditById,
  removeCreditById,
};

export default creditRepository;
