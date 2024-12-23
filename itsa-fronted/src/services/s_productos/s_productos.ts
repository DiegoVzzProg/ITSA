import api from '../api';

export const getProductos = async (data: Record<string, any>) => {
    try {
        const response = await api.post('/productos', data);
        return response.data;
    } catch (error) {
        console.error('Error al obtener productos:', error);
    }
};