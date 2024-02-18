import {Toast} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class BaseService {
  constructor(private baseUrl: string) {}

  private STORED_DATA: StorageState = {
    is_authenticated: false,
    access_token: '',
    user: {
      email: '',
      first_name: '',
      last_name: '',
      phone_number: '',
    },
  };

  protected PHONE_REGEX = /^[0-9\b]+$/;
  protected EMAIL_REGEX =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  /**
   * method to make a get request
   * @summary this request is only made to api
   * @param path
   * @returns
   */
  protected async get<T>(path: string): Promise<T> {
    const email = (await AsyncStorage.getItem('email')) as string;
    const res = await fetch(`${this.baseUrl}${path}`, {
      headers: {
        authorization: email,
      },
    });
    const resp = await res.json();
    if (!resp.status) throw new Error(resp?.message || 'An error occurred');
    if (!res.ok) throw new Error('An error occurred');
    const data = resp.data;
    return data as T;
  }

  /**
   * method to make a post request
   * @summary this request is only made to api
   * @param path
   * @param body
   * @returns
   */
  protected async post<T>(
    path: string,
    body: any,
    type: 'json' | 'multipart' = 'json',
  ): Promise<Aers<T>> {
    const email = (await AsyncStorage.getItem('email')) as string;

    const res = await fetch(`${this.baseUrl}${path}`, {
      method: 'POST',
      body: type === 'json' ? JSON.stringify(body) : body,
      headers:
        type === 'json'
          ? {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              authorization: email,
            }
          : {
              authorization: email,
            },
    });
    this.handleStatusCode(res);
    const resp = await res.json();
    return resp;
  }

  /**
   * method to make a patch request
   * @summary this request is only made to WhoisId api
   * @param path
   * @param body
   * @returns
   */
  protected async patch<T>(path: string, body: any): Promise<Aers<T>> {
    const email = (await AsyncStorage.getItem('email')) as string;
    const res = await fetch(`${this.baseUrl}${path}`, {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        authorization: email,
      },
    });

    this.handleStatusCode(res);
    const resp = await res.json();
    return resp;
  }

  /**
   * handles error code a limit exception errors
   * @param res
   * @returns
   */
  protected handleStatusCode(res: Response) {
    const allowedStatus = [200, 201, 404, 400, 502];
    if (allowedStatus.includes(res.status)) return res;
    else throw new Error('50X');
  }

  public regexTest({value, type}: {value: string; type: 'PHONE' | 'EMAIL'}) {
    if (type === 'PHONE') {
      return this.PHONE_REGEX.test(value);
    }
    if (type === 'EMAIL') {
      return this.EMAIL_REGEX.test(value);
    }
  }

  /**
   * Checks data and confirm all its value exist
   * @param data
   * @param customKey a value to be displayed instead of default key
   * @returns
   */
  public strictCheck<T>(
    data: {[key: string]: any},
    config?: StrictCheckConfig,
    customKey?: any | null,
  ) {
    const validation = (value: string, key: string) => {
      if (config?.validations) {
        if (Array.isArray(config.validations)) {
          if (
            config?.validations?.indexOf(key) !== -1 &&
            key === 'phone_number'
          ) {
            if (
              value.length !== 11 ||
              !this.regexTest({value, type: 'PHONE'})
            ) {
              return 'Invalid phone format';
            }
          }

          if (config?.validations?.indexOf(key) !== -1 && key === 'email') {
            if (!this.regexTest({value, type: 'EMAIL'})) {
              return 'Invalid email format';
            }
          }
        }
      }
    };

    if (!Array.isArray(data)) {
      for (const key in data) {
        if (
          !data[key] ||
          data[key] === '' ||
          typeof data[key] === 'undefined' ||
          data[key] === null
        ) {
          if (customKey) {
            return {
              status: false,
              error: `${customKey[key.replace(/_/g, ' ')]} is required`,
              value: key,
            };
          }
          if (validation(data[key], key)) {
            return {
              status: false,
              error: validation(data[key], key),
              value: key,
            };
          }
          if (typeof data[key] !== 'boolean') {
            return {
              status: false,
              error: `${key.replace(/_/g, ' ')} is required`,
              value: key,
            };
          }
        }
      }
      return {status: true, data};
    }
  }

  /**
   * generates random string
   * @param len
   * @param arr
   * @returns  string
   */
  randomStr(len: number, arr: string = ''): string {
    var ans = '';
    for (var i = len; i > 0; i--) {
      ans += arr[Math.floor(Math.random() * arr.length)];
    }
    return ans;
  }

  _storage() {
    return {
      set: (payload: Partial<User>) => {
        const store = AsyncStorage;
        const data = payload as any;
        const multiSet = Object.keys(payload).map(key => {
          if (typeof data[key] === 'string') {
            return [key, data[key]] as [string, string];
          } else if (typeof data[key] === 'boolean') {
            return [key, `${data[key]}`] as [string, string];
          } else return [key, JSON.stringify(data[key])] as [string, string];
        });
        store.multiSet(multiSet);
      },
      get: () => {
        const storage = AsyncStorage;
        let data: any = {};
        Object.keys(this.STORED_DATA).forEach(async (acc: string) => {
          data[acc] = await storage.getItem(acc);
        });
        if (data) {
          console.log(data);

          return data as User;
        }
      },
    };
  }

  success = (message?: string) =>
    Toast.show({title: message!, background: 'green.400'});
  error = (message?: string) =>
    Toast.show({title: message!, background: 'red.400'});
  info = (message?: string) =>
    Toast.show({title: message!, background: 'orange.400'});
}
