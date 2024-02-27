import api from './api';

export async function getTransactions(token) {
  const response = await api.get('/transactions/historic', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function storeTransaction(body, token) {
  const response = await api.post('/transactions/store', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
