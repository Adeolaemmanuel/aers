type Aers<T> = {
  data?: T;
  error?: string;
  code: any;
  message?: string;
};
type StrictCheckConfig = {
  validations: string[];
};
