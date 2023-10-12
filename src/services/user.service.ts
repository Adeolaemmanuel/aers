import {ENV} from '../utils/_env';
import BaseService from './base.service';

export default class UserService extends BaseService {
  private static instance: UserService;

  public static getInstance() {
    if (!this.instance) {
      this.instance = new UserService(`${ENV.api_dev}/users`);
    }
    return this.instance;
  }

  async getUser(email: string) {
    try {
      const res = await this.get<User>(`/${email}`);
      return res;
    } catch (error) {}
  }

  async createUser(payload: CreateUser) {
    const check = this.strictCheck(payload);
    if (check?.error) {
      this.error(check.error);
      return;
    }

    const res = this.post<User>('/', check?.data);
    return res;
  }

  async updateUser(payload: CreateUser) {
    const check = this.strictCheck(payload);
    if (check?.error) {
      this.error(check.error);
      return;
    }

    const res = this.patch<User>('/', check?.data);
    return res;
  }
}
