import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import { duplicatedEmailError } from './errors';
import userRepository from '@/repositories/user-repository';
import { createUserSchema } from '@/schemas';

export async function createUser({ email, password }: CreateUserParams): Promise<User> {
  await validateUniqueEmailOrFail(email);

  await validateCreateUserParamsOrFail({ email, password });

  const hashedPassword = await bcrypt.hash(password, 12);
  return userRepository.create({
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

async function validateCreateUserParamsOrFail(params: CreateUserParams) {
  await createUserSchema.validateAsync(params);
}

export type CreateUserParams = Pick<User, 'email' | 'password'>;

const userService = {
  createUser,
};

export * from './errors';
export default userService;
