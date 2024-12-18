import api from '../api';

export const fileEncrypted = async (folder: string, filename: string) => {
    try {
        return (await api.get(`/get/${folder}/${filename}`)).data;
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        throw error;
    }
};