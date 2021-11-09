import { LoginForm, LoginResp, Response } from 'type'
import axios from '../utils/axios'

export async function login(loginForm: LoginForm):Promise<LoginResp>{
    return axios.request({
        method: 'post',
        url: '/user/login',
        /* params */
        data: loginForm,
    });
}