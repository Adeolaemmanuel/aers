import {ENV} from '../utils/_env';
import BaseService from './base.service';

export default class QuestionsService extends BaseService {
  private static instance: QuestionsService;

  public static getInstance() {
    if (!this.instance) {
      this.instance = new QuestionsService(`${ENV.api_dev}/questions`);
    }
    return this.instance;
  }

  async getAllQuestion(slug: string) {
    try {
      const res = await this.get<Questions[]>(`/${slug}`);
      return res;
    } catch (error) {
      console.log(error);
    }
  }

  async insertAnswer(payload: InsertAnswers) {
    try {
      const res = await this.post<Answers>(`/answer`, payload);
      return res;
    } catch (error) {
      console.log(error, 'insertAnswer');
    }
  }
}
