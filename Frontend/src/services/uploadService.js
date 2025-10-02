import api from './api';

export const uploadFile = async (file) => {
  const form = new FormData();
  form.append('file', file);
  const res = await api.post('/upload/file', form, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return res.data;
};

export const getAssignments = async () => {
  const res = await api.get('/upload/assignments');
  return res.data;
};
