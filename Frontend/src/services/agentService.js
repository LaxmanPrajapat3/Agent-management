import api from './api';

export const getAgents = async () => {
  const res = await api.get('/agents');
  return res.data;
};

export const createAgent = async (payload) => {
  const res = await api.post('/agents', payload);
  return res.data;
};

export const updateAgent = async (id, payload) => {
  const res = await api.put(`/agents/${id}`, payload);
  return res.data;
};

export const deleteAgent = async (id) => {
  const res = await api.delete(`/agents/${id}`);
  return res.data;
};
