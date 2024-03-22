import { faker } from '@faker-js/faker';
import * as jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import supertest from 'supertest';
import { cleanDb, generateValidToken } from '../helpers';
import { createUser, createCredit } from '../factories';
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

describe('GET /credits', () => {
  it('should respond with status 401 if no token is given', async () => {
    const response = await server.get('/credits');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();

    const response = await server.get('/credits').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.get('/credits').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('when token is valid', () => {
    it('should respond with status 200 and return historic', async () => {
      const user = await createUser();
      const user2 = await createUser();
      const token = await generateValidToken(user);
      const token2 = await generateValidToken(user2);
      let credit;
      let credit2;

      for (let i = 0; i < 10; i++) {
        credit = await createCredit(user);
        await server.post('/credits/store').set('Authorization', `Bearer ${token}`).send(credit);
      }

      for (let i = 0; i < 10; i++) {
        credit2 = await createCredit(user2);
        await server.post('/credits/store').set('Authorization', `Bearer ${token2}`).send(credit2);
      }

      const response = await server.get('/credits').set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            userId: credit.userId,
            debtor: expect.any(String),
            amount: expect.any(Number),
            paid: expect.any(Boolean),
            createdAt: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/),
            payDate: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/),
          }),
        ]),
      );
    });
  });
});

describe('POST /credits/store', () => {
  it('should respond with status 401 if no token is given', async () => {
    const response = await server.post('/credits/store');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();

    const response = await server.post('/credits/store').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.post('/credits/store').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('when token is valid', () => {
    it('should respond with status 400 if amount is invalid', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const credit = await createCredit(user);
      credit.amount = undefined;
      const body = credit;
      const response = await server.post('/credits/store').set('Authorization', `Bearer ${token}`).send(body);
      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it('should respond with status 400 if payDate is invalid', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const credit = await createCredit(user);
      credit.payDate = faker.date.past();
      const body = credit;
      const response = await server.post('/credits/store').set('Authorization', `Bearer ${token}`).send(body);
      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it('should respond with status 400 if debtor is invalid', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const credit = await createCredit(user);
      credit.debtor = '';
      const body = credit;
      const response = await server.post('/credits/store').set('Authorization', `Bearer ${token}`).send(body);
      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it('should respond with status 201 and create credit', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const credit = await createCredit(user);
      const body = credit;
      const response = await server.post('/credits/store').set('Authorization', `Bearer ${token}`).send(body);

      expect(response.status).toBe(httpStatus.CREATED);
      expect(response.body).toEqual({
        id: expect.any(Number),
        userId: credit.userId,
        debtor: credit.debtor,
        amount: credit.amount,
        paid: expect.any(Boolean),
        createdAt: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/),
        payDate: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/),
      });
    });
  });
});

describe('GET /credits/:creditId', () => {
  it('should respond with status 401 if no token is given', async () => {
    const response = await server.get('/credits/:1');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();

    const response = await server.get('/credits/:1').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.get('/credits/:1').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('when token is valid', () => {
    it('should respond with status 200 and return credit', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const credit = await createCredit(user);

      const response = await server.get(`/credits/${credit.id}`).set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual({
        id: credit.id,
        userId: credit.userId,
        debtor: credit.debtor,
        amount: credit.amount,
        paid: expect.any(Boolean),
        createdAt: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/),
        payDate: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/),
      });
    });
  });
});

describe('DELETE /credits/delete/:creditId', () => {
  it('should respond with status 401 if no token is given', async () => {
    const response = await server.delete('/credits/delete/:1');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();

    const response = await server.delete('/credits/delete/:1').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.delete('/credits/delete/:1').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('when token is valid', () => {
    it('should respond with status 200 and delete credit', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const credit = await createCredit(user);
      const body = credit;
      const stored = await server.post('/credits/store').set('Authorization', `Bearer ${token}`).send(body);
      const response = await server.delete(`/credits/delete/${body.id}`).set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual({
        id: expect.any(Number),
        userId: credit.userId,
        debtor: credit.debtor,
        amount: credit.amount,
        paid: expect.any(Boolean),
        createdAt: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/),
        payDate: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/),
      });
    });
  });
});
