import api from './api';

export async function signUp(email, password, username) {
  const response = await api.post('/users', { email, password, username });
  return response.data;
}
//
