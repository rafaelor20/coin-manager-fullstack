import api from './api';

export async function getCredits(token) {
  const response = await api.get('/credits', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function getCreditById(id, token) {
  const response = await api.get(`/credits/${id}`, {
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

export async function deleteCredit(id, token) {
  const response = await api.delete(`/credits/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function payCredit(id, body, token) {
  const response = await api.post(`/credits/payment/${id}`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
