import { User, Debt } from '@prisma/client';
import faker from '@faker-js/faker';
import { prisma } from '@/config';

export async function createDebt(params: Partial<User> = {}): Promise<Debt> {
  return prisma.debt.create({
    data: {
      userId: params.id || 12,
      creditor: faker.word.preposition(),
      description: faker.lorem.sentence(),
      amount: 3214,
      payDate: faker.date.soon(),
      paid: false,
    },
  });
}
