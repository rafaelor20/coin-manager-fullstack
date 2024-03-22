import { User, UserCredit } from '@prisma/client';
import faker from '@faker-js/faker';
import { prisma } from '@/config';

export async function createCredit(params: Partial<User> = {}): Promise<UserCredit> {
  return prisma.userCredit.create({
    data: {
      userId: params.id,
      debtor: faker.word.preposition(),
      amount: faker.datatype.number(),
      payDate: faker.date.soon(),
      paid: false,
    },
  });
}
