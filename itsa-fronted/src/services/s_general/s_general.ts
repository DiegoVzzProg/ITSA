import { MySQLInfo } from '../../interface/mysql.interface';
import { IsNullOrEmpty } from '../../utils/site';
import api from '../api';

export const fileEncrypted = async (folder: string, filename: string) => {

    var response: any = null

    try {
        response = await api.get(`/archivo/${folder}/${filename}`);
    }
    catch (error: any) {
        MySQLInfo.message = "Internal Error"
    }

    if (!IsNullOrEmpty(MySQLInfo.message)) return response;
    MySQLInfo.message = response.data.message;

    return response.data;
};

export const SecretKey = async () => {
    var response: any = null

    try {
        response = await api.get(`/scret/key`);
    }
    catch (error: any) {
        MySQLInfo.message = "Internal Error"
    }

    if (!IsNullOrEmpty(MySQLInfo.message))
        return response;

    MySQLInfo.message = response.data.message;

    return response.data;
}
