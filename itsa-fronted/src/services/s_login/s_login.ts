import { MySQLInfo } from '../../interface/mysql.interface';
import { IsNullOrEmpty } from '../../utils/site';
import api from '../api';
import { SecretKey } from '../s_general/s_general';

export const fnLogin = async (data: Record<string, any>) => {

    var response: any = null
    var response_secret_key: any = null;
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
        localStorage.setItem("token", token);

        try {
            response_secret_key = await SecretKey();
        } catch (error: any) {
            MySQLInfo.message = "Internal Error"
        }

        console.log(response_secret_key);


        if (IsNullOrEmpty(MySQLInfo.message)) {
            localStorage.setItem('secretKey', String(response_secret_key.data));
        } else {
            localStorage.setItem('secretKey', '');
        }
    }

    return response.data;


};

export const fnRegister = async (data: Record<string, any>) => {
    var response: any = null

    try {
        response = await api.post('/register', data);
    } catch (error: any) {
        MySQLInfo.message = "Internal Error"
    }

    if (!IsNullOrEmpty(MySQLInfo.message))
        return response;

    MySQLInfo.message = response.data.message;

    return response.data;
}