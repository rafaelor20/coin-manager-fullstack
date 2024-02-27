import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import { duplicatedEmailError } from './errors';
import { invalidDataError } from '@/errors';
import userRepository from '@/repositories/user-repository';

export async function createUser({ username, email, password }: CreateUserParams): Promise<User> {
  await validateUniqueEmailOrFail(email);
  await validateUniqueUername(username);

  const hashedPassword = await bcrypt.hash(password, 12);
  return userRepository.create({
    username,
    email,
    password: hashedPassword,
  });
}

async function validateUniqueEmailOrFail(email: string) {
  const userWithSameEmail = await userRepository.findByEmail(email);
  if (userWithSameEmail) {
    throw duplicatedEmailError();
  }
}

async function validateUniqueUername(username: string) {
  const userWithSameUsername = await userRepository.findByUserName(username);
  if (userWithSameUsername) {
    throw invalidDataError([username]);
  }
}

export type CreateUserParams = Pick<User, 'username' | 'email' | 'password'>;

const userService = {
  createUser,
};

export * from './errors';
export default userService;
