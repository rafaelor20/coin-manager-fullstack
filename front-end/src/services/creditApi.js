import api from './api';

export async function getCredits(token) {
  const response = await api.get('/credits', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function storeCredit(body, token) {
  const response = await api.post('/credits/store', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
