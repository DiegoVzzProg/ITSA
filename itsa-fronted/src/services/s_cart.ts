import api from './api';

export const fn_l_carrito_cliente = async (data: Record<string, any>) => {
    try {
        const response = await api.post('/carritocliente', data);
        return response.data;
    } catch (error) {
        console.error('Cart customer:', error);
    }
};

export const fn_a_carrito_cliente = async (data: Record<string, any>) => {
    try {
        const response = await api.post('/agregar/carrito', data);
        return response.data;
    } catch (error) {
        console.error('Cart customer:', error);
    }
}