import { ApplicationError } from '@/protocols';

export function invalidDescriptionError(): ApplicationError {
  return {
    name: 'invalidDescriptionError',
    message: 'Invalid Description Error!',
  };
}
