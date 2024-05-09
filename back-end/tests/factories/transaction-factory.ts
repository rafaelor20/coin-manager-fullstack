import { User, Transaction } from '@prisma/client';
import faker from '@faker-js/faker';
import { prisma } from '@/config';

export async function createTransaction(params: Partial<User> = {}): Promise<Transaction> {
  return prisma.transaction.create({
    data: {
      userId: params.id || 12,
      description: faker.word.preposition(),
      amount: 3214,
      entity: faker.company.companyName(),
    },
  });
}
