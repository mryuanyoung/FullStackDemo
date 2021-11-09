import { LoginForm, LoginResp, Response } from 'type'
import { PostMapping, RestController, RequestMapping, Autowired, RequestBody, RequestParam, GetMapping } from '../decorator/Request'
import { LoginService } from '../Service/login'

@RestController
@RequestMapping('/user')
export class LoginController {

    // 因为没有反射机制获取变量类型，所以让变量命名=类名才能被正确注入
    // ts装饰器实现机制已经保证了LoginController类注解会在变量注解之后执行，所以不用考虑注入顺序问题
    @Autowired
    LoginService: LoginService

    @PostMapping('/login')
    public async login(@RequestBody loginForm: LoginForm): Promise<LoginResp> {
        try {
            return await this.LoginService.login(loginForm)
        }
        catch (err) {
            return Response.fail(err)
        }
    }
}