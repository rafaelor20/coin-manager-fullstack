import { faker } from '@faker-js/faker';
import * as jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import supertest from 'supertest';
import { cleanDb, generateValidToken } from '../helpers';
import { createUser, createTransaction } from '../factories';
import app, { init, close } from '@/app';

beforeAll(async () => {
  await init();
  await cleanDb();
});

beforeEach(async () => {
  await cleanDb();
});

afterAll(async () => {
  await close();
});

const server = supertest(app);

describe('GET /transactions/historic', () => {
  it('should respond with status 401 if no token is given', async () => {
    const response = await server.get('/transactions/historic');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();

    const response = await server.get('/transactions/historic').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.get('/transactions/historic').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('when token is valid', () => {
    it('should respond with status 200 and return historic', async () => {
      const user = await createUser();
      const user2 = await createUser();
      const token = await generateValidToken(user);
      const token2 = await generateValidToken(user2);

      let transaction;
      let transaction2;

      for (let i = 0; i < 10; i++) {
        transaction = await createTransaction(user);
        await server.post('/transactions/store').set('Authorization', `Bearer ${token}`).send(transaction);
      }

      for (let i = 0; i < 10; i++) {
        transaction2 = await createTransaction(user2);
        await server.post('/transactions/store').set('Authorization', `Bearer ${token2}`).send(transaction2);
      }

      const response = await server.get('/transactions/historic').set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            userId: transaction.userId,
            description: expect.any(String),
            amount: expect.any(Number),
            entity: expect.any(String),
            createdAt: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/),
          }),
        ]),
      );
    });
  });
});

describe('POST /transactions/store', () => {
  it('should respond with status 401 if no token is given', async () => {
    const response = await server.post('/transactions/store');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();

    const response = await server.post('/transactions/store').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.post('/transactions/store').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('when token is valid', () => {
    it('should respond with status 400 if amount is invalid', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const transaction = await createTransaction(user);
      transaction.amount = undefined;
      const body = transaction;
      const response = await server.post('/transactions/store').set('Authorization', `Bearer ${token}`).send(body);

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it('should respond with status 400 if description is invalid', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const transaction = await createTransaction(user);
      transaction.description = '';
      const body = transaction;
      const response = await server.post('/transactions/store').set('Authorization', `Bearer ${token}`).send(body);

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it('should respond with status 201 and create store', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const transaction = await createTransaction(user);
      const body = transaction;
      const response = await server.post('/transactions/store').set('Authorization', `Bearer ${token}`).send(body);

      expect(response.status).toBe(httpStatus.CREATED);
      expect(response.body).toEqual({
        id: expect.any(Number),
        userId: transaction.userId,
        description: transaction.description,
        amount: transaction.amount,
        createdAt: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/),
        entity: transaction.entity,
      });
    });
  });
});

describe('DELETE /transactions/delete/:transactionId', () => {
  it('should respond with status 401 if no token is given', async () => {
    const response = await server.delete('/transactions/delete/1');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();

    const response = await server.delete('/transactions/delete/1').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);
    const response = await server.delete('/transactions/delete/1').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 200 and delete transaction', async () => {
    const user = await createUser();
    const token = await generateValidToken(user);
    const transaction = await createTransaction(user);
    const storedTransaction = await server
      .post('/transactions/store')
      .set('Authorization', `Bearer ${token}`)
      .send(transaction);
    const response = await server
      .delete(`/transactions/delete/${storedTransaction.body.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.OK);
  });
});
