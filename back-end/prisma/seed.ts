import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  
  const user1 = await prisma.user.create({
    data: {
      username: 'user1',
      password: 'password1',
      email: 'user1@example.com',
      sessions: {
        create: [
          {
            token: 'token1',
          },
        ],
      },
      transactions: {
        create: [
          {
            description: 'Transaction 1',
            amount: 100.0,
          },
          {
            description: 'Transaction 2',
            amount: -50.0,
          },
        ],
      },
      UserDebt: {
        create: [
          {
            creditor: 'creditor1',
            amount: 200.0,
          },
        ],
      },
      UserCredit: {
        create: [
          {
            debtor: 'debtor1',
            amount: 300.0,
          },
        ],
      },
    },
  });

  const user2 = await prisma.user.create({
    data: {
      username: 'user2',
      password: 'password2',
      email: 'user2@example.com',
      sessions: {
        create: [
          {
            token: 'token2',
          },
        ],
      },
      transactions: {
        create: [
          {
            description: 'Transaction 3',
            amount: 75.0,
          },
          {
            description: 'Transaction 4',
            amount: -25.0,
          },
        ],
      },
      UserDebt: {
        create: [
          {
            creditor: 'creditor2',
            amount: 150.0,
          },
        ],
      },
      UserCredit: {
        create: [
          {
            debtor: 'debtor2',
            amount: 250.0,
          },
        ],
      },
    },
  });

  console.log('Users created:', { user1, user2 });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
