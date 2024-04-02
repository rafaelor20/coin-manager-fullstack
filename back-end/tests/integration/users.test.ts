import { faker } from '@faker-js/faker';
import httpStatus from 'http-status';
import supertest from 'supertest';
import { cleanDb } from '../helpers';
import { prisma } from '@/config';
import app, { init, close } from '@/app';

beforeAll(async () => {
  await init();
  await cleanDb();
});

afterAll(async () => {
  await close();
});

const server = supertest(app);

describe('POST /users', () => {
  it('should respond with status 422 when email is not valid', async () => {
    const body = {
      email: faker.lorem.word(),
      password: faker.internet.password(6),
    };

    const response = await server.post('/users').send(body);

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it('should respond with status 422 when password is not valid', async () => {
    const body = {
      email: faker.internet.email(),
      password: faker.lorem.word(5),
    };

    const response = await server.post('/users').send(body);

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  describe('when body is valid', () => {
    const generateValidBody = () => ({
      email: faker.internet.email(),
      password: faker.internet.password(6),
    });

    it('should not register user with duplicated email', async () => {
      const body = generateValidBody();
      await prisma.user.create({ data: body });

      const response = await server.post('/users').send(body);

      expect(response.status).toBe(httpStatus.CONFLICT);
    });

    it('should not return user password on body', async () => {
      const body = generateValidBody();

      const response = await server.post('/users').send(body);

      expect(response.body).not.toHaveProperty('password');
    });

    it('should save user on db', async () => {
      const body = generateValidBody();

      const response = await server.post('/users').send(body);

      const user = await prisma.user.findUnique({
        where: { email: body.email },
      });
      expect(user).toEqual(
        expect.objectContaining({
          id: response.body.id,
          email: body.email,
        }),
      );
    });
  });
});
