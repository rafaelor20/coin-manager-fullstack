import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import authenticationService, { invalidCredentialsError } from '@/services/authentication-service';
import userRepository from '@/repositories/user-repository';
import sessionRepository from '@/repositories/session-repository';

jest.mock('@/repositories/user-repository');
jest.mock('@/repositories/session-repository');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('authenticationService.signIn', () => {
  const mockUser = {
    id: 1,
    email: faker.internet.email(),
    password: 'hashedPassword',
    createdAt: new Date(),
    amount: 100,
  };

  const validParams = {
    email: mockUser.email,
    password: 'plainPassword',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(userRepository, 'findByEmail').mockResolvedValue(mockUser);
  });

  it('should throw InvalidCredentialError if there is no user for given email', async () => {
    jest.spyOn(userRepository, 'findByEmail').mockResolvedValue(null);

    await expect(authenticationService.signIn(validParams)).rejects.toEqual(invalidCredentialsError());
    expect(userRepository.findByEmail).toHaveBeenCalledWith(validParams.email, {
      id: true,
      email: true,
      password: true,
    });
  });

  it('should throw InvalidCredentialError if given password is invalid', async () => {
    expect(userRepository.findByEmail).toHaveBeenCalledWith(validParams.email);
    jest.spyOn(bcrypt, 'compare').mockResolvedValue(false as unknown as never);

    await expect(authenticationService.signIn(validParams)).rejects.toEqual(invalidCredentialsError());
    expect(userRepository.findByEmail).toHaveBeenCalledWith(validParams.email);
    expect(bcrypt.compare).toHaveBeenCalledWith(validParams.password, mockUser.password);
  });

  it('should return user data and token if email and password are valid', async () => {
    const mockToken = 'validToken';
    expect(userRepository.findByEmail).toHaveBeenCalledWith(validParams.email);
    jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as unknown as never);
    jest.spyOn(jwt, 'sign').mockImplementation(() => mockToken);
    jest.spyOn(sessionRepository, 'create').mockResolvedValue({
      id: 1,
      userId: mockUser.id,
      token: mockToken,
      createdAt: new Date(),
    });

    const result = await authenticationService.signIn(validParams);

    expect(result).toEqual({
      user: {
        id: mockUser.id,
        email: mockUser.email,
      },
      token: mockToken,
    });
    expect(userRepository.findByEmail).toHaveBeenCalledWith(validParams.email, {
      id: true,
      email: true,
      password: true,
    });
    expect(bcrypt.compare).toHaveBeenCalledWith(validParams.password, mockUser.password);
    expect(jwt.sign).toHaveBeenCalledWith({ userId: mockUser.id }, process.env.JWT_SECRET);
    expect(sessionRepository.create).toHaveBeenCalledWith({ token: mockToken, userId: mockUser.id });
  });
});
