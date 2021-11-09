import { Service, Autowired } from "../decorator/Request";
import { LoginForm, LoginResp, Response } from 'type';
import UserRepository from '../Repository/userRepository';

@Service
export class LoginService {

    @Autowired
    UserRepository: UserRepository

    public async login(loginForm: LoginForm): Promise<LoginResp> {
        try {
            const user = await this.UserRepository.findUserByAccount(loginForm.account);
            if (user.account === loginForm.account && user.password === loginForm.password) {
                return Response.success({
                    token: '哈哈哈',
                    role: user.role
                })
            }
            else {
                throw '密码错误'
            }
        }
        catch (err) {
            throw err;
        }
    }
}