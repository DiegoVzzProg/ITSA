import api from '../api';

export const postLogin = async (data: Record<string, any>) => (await api.post('/login', data)).data;