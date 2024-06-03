import { ApplicationError } from '@/protocols';

export function invalidCreditIdError(): ApplicationError {
  return {
    name: 'invalidId',
    message: `Id is not valid number`,
  };
}
