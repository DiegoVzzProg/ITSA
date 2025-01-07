import { MySQLInfo } from '../../interface/mysql.interface';
import { IsNullOrEmpty } from '../../utils/site';
import { SecretKey } from '../s_general/s_general';
import api from '../api';
import Cookies from "js-cookie";

export const fnLogin = async (data: Record<string, any>) => {

    var response: any = null
    try {
        response = await api.post('/login', data);
    }
    catch (error: any) {
        MySQLInfo.message = "Internal Error"
    }

    if (!IsNullOrEmpty(MySQLInfo.message))
        return response;

    MySQLInfo.message = response.data.message;

    if (IsNullOrEmpty(MySQLInfo.message)) {
        const token = response.data.data.token;

        Cookies.set('token', token, {
            secure: true,
            sameSite: 'Strict',
            path: '/',
        });

        await getSecretKey();
    }

    return response.data;


};

export const fn_register = async (data: Record<string, any>) => {
    var response: any = null
    try {
        response = await api.post('/register', data);
    } catch (error: any) {
        MySQLInfo.message = "Internal Error"
    }

    if (!IsNullOrEmpty(MySQLInfo.message))
        return response;

    MySQLInfo.message = response.data.message;

    if (IsNullOrEmpty(MySQLInfo.message)) {
        const token = response.data.data.token;

        Cookies.set('token', token, {
            secure: true,
            sameSite: 'Strict',
            path: '/',
        });

        await getSecretKey();
    }


    return response.data;
}

const getSecretKey = async () => {
    var response_secret_key: any = null;
    try {
        response_secret_key = await SecretKey();
    } catch (error: any) {
        MySQLInfo.message = "Internal Error"
    }

    if (IsNullOrEmpty(MySQLInfo.message)) {
        localStorage.setItem('secretKey', String(response_secret_key));
    } else {
        localStorage.setItem('secretKey', '');
    }
}