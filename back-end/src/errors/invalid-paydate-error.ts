import { ApplicationError } from '@/protocols';

export function invalidPayDateError(): ApplicationError {
  return {
    name: 'InvalidPayDateError',
    message: 'Invalid Paydate Error!',
  };
}
