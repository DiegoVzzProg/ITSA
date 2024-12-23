import api from '../api';

export const fnLogin = async (data: Record<string, any>) => {
    try {
        const response = await api.post('/login', data);

        if (String(response.data.message) === '') {
            const token = response.data.data.token;
            localStorage.setItem("token", token);
        }

        return response.data;
    } catch (error) {
        console.error('Error en el login:', error);
    }
};

export const fnRegister = async (data: Record<string, any>) => {
    try {
        const response = await api.post('/register', data);
        return response.data;
    } catch (error) {
        console.error('Error en el registro:', error);
        throw error;
    }
}