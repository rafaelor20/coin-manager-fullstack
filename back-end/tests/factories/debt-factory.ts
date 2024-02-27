import { User, UserDebt } from '@prisma/client';
import faker from '@faker-js/faker';
import { prisma } from '@/config';

export async function createDebt(params: Partial<User> = {}): Promise<UserDebt> {
  return prisma.userDebt.create({
    data: {
      userId: params.id || 12,
      creditor: faker.word.preposition(),
      amount: 3214,
      payDate: faker.date.soon(),
    },
  });
}
