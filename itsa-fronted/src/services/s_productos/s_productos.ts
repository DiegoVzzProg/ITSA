import { MySQLInfo } from '../../interface/mysql.interface';
import { IsNullOrEmpty } from '../../utils/site';
import api from '../api';

export const getProductos = async (data: Record<string, any>) => {
    var response: any = null

    try {
        response = await api.post('/productos', data);
    }
    catch (error: any) {
        MySQLInfo.message = "Internal Error"
    }

    if (!IsNullOrEmpty(MySQLInfo.message)) return response;
    MySQLInfo.message = response.data.message;

    return response.data;
};