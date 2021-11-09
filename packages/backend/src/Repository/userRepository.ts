import { Repository } from 'typeorm';
import { Repo } from '../decorator/database';
import { User } from '../PO/user';

@Repo('User')
export default class UserRepository {

    repo: Repository<User>

    async findUserByAccount(account: string) {
        const res = await this.repo.find({ account });
        if (res.length !== 1) {
            throw '未找到用户';
        }
        else {
            return res[0];
        }
    }
}