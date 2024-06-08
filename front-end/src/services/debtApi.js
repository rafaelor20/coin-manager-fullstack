import api from './api';

export async function getDebts(token) {
  const response = await api.get('/debts', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function storeDebt(body, token) {
  const response = await api.post('/debts/store', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function deleteDebt(id, token) {
  const response = await api.delete(`/debts/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function payDebt(body, token) {
  const response = await api.post('/debts/payment', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
