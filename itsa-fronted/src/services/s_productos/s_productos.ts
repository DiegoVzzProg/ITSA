import api from '../api';

export const getProductos = async (data: Record<string, any>) => {
    try {
        return (await api.post('/productos', data)).data;
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        throw error;
    }
};