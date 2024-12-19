import api from '../api';

export const fileEncrypted = async (filename: string) => {
    try {
        return (await api.get(`/archivo/${filename}`)).data;
    } catch (error) {
        console.error('Error: ', error);
        throw error;
    }
};
