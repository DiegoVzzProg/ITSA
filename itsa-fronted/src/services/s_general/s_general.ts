import api from '../api';

export const fileEncrypted = async (folder: string, filename: string) => {
    try {
        const response = await api.get(`/archivo/${folder}/${filename}`);
        return response.data;
    } catch (error) {
        console.log('Error General: ', error);
        throw error;
    }
};
