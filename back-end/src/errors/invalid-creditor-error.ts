import { ApplicationError } from '@/protocols';

export function invalidCreditorError(): ApplicationError {
  return {
    name: 'InvalidCreditorError',
    message: 'Invalid Creditor Error!',
  };
}
