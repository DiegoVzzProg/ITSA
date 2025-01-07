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


export const DownloadFile = async (arch: string) => {
    var response: any = null

    try {
        response = await api.get(`/downloadfile/${arch}`, {
            responseType: 'blob',
        });
    }
    catch (error: any) {
        MySQLInfo.message = "Internal Error"
    }

    if (!IsNullOrEmpty(MySQLInfo.message))
        return response;

    MySQLInfo.message = response.data.message;

    return response.data;
}

export const fn_l_paises = async () => {
    var response: any = null

    try {
        response = await api.get(`/countries`);
    }
    catch (error: any) {
        MySQLInfo.message = "Internal Error"
    }

    if (!IsNullOrEmpty(MySQLInfo.message))
        return response;

    MySQLInfo.message = response.data.message;

    return response.data;
}