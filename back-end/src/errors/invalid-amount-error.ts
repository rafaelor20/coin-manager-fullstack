import { ApplicationError } from '@/protocols';

export function invalidAmountError(): ApplicationError {
  return {
    name: 'InvalidAmountError',
    message: 'Invalid Amount Error!',
  };
}
