import { ApplicationError } from '@/protocols';

export function invalidTransactionIdError(): ApplicationError {
  return {
    name: 'invalidTransactionIdError',
    message: 'Invalid Transaction Id Error!',
  };
}
