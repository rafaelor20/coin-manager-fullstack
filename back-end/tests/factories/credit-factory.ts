import { User, Credit } from '@prisma/client';
import faker from '@faker-js/faker';
import { prisma } from '@/config';

export async function createCredit(params: Partial<User> = {}): Promise<Credit> {
  return prisma.credit.create({
    data: {
      userId: params.id,
      debtor: faker.word.preposition(),
      description: faker.lorem.sentence(),
      amount: faker.datatype.number(),
      payDate: faker.date.soon(),
      paid: false,
    },
  });
}
