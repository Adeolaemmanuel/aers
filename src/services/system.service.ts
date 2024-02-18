import {ENV} from '../utils/_env';
import BaseService from './base.service';

export default class SystemService extends BaseService {
  private static instance: SystemService;

  public static getInstance() {
    if (!this.instance) {
      this.instance = new SystemService(`${ENV.api_dev}/system`);
    }
    return this.instance;
  }

  async getUserDesignation() {
    const res = await this.get<DesignationState[]>('/designation');
    return res;
  }

  async getAllQuestion() {
    const res = await this.get<Questions[]>('/designation');
    return res;
  }

  async getAllStages() {
    try {
      const res = await this.get<{name: string; slug: string}[]>(`/stages`);
      return res.map(({slug}) => slug);
    } catch (error) {
      console.log(error, 'stages');
    }
  }
}
