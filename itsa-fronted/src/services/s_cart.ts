import { MySQLInfo } from '../interface/mysql.interface';
import { IsNullOrEmpty } from '../utils/site';
import api from './api';

export const fn_l_carrito_cliente = async (data: Record<string, any>) => {
    var response: any = null

    try {
        response = await api.post('/carritocliente', data);
    }
    catch (error: any) {
        MySQLInfo.message = "Internal Error"
    }

    if (!IsNullOrEmpty(MySQLInfo.message))
        return response;

    MySQLInfo.message = response.data.message;

    return response.data;
};

export const fn_a_carrito_cliente = async (data: Record<string, any>) => {
    var response: any = null

    try {
        response = await api.post('/agregar/carrito', data);
    }
    catch (error: any) {
        MySQLInfo.message = "Internal Error"
    }

    if (!IsNullOrEmpty(MySQLInfo.message))
        return response;

    MySQLInfo.message = response.data.message;

    return response.data.data;
}

export const fn_l_precio_carrito_cliente = async (data: Record<string, any>) => {
    var response: any = null

    try {
        response = await api.get(`/precio/${data.id_usuario}`);
    }
    catch (error: any) {
        MySQLInfo.message = "Internal Error"
    }

    if (!IsNullOrEmpty(MySQLInfo.message))
        return response;

    MySQLInfo.message = response.data.message;

    return response.data.data;
}