import { ApplicationError } from '@/protocols';

export function invalidDebtorError(): ApplicationError {
  return {
    name: 'InvalidDebtorError',
    message: 'Invalid Debtor Error!',
  };
}
