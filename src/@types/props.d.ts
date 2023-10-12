type CustomInputProps = {
  questions: Questions[];
  setBody: React.Dispatch<any>;
  body: any;
  onChange: (data: any) => void;
};

type Route<T> = {
  params: T;
};

type CategoryInput = {
  options: any;
  onChange: (data: any) => void;
};
type SelectInputProps = {
  options: [];
  onChange: (data: any) => void;
};
type CheckedInputProps = {
  options: [];
  onChange: (data: any) => void;
};
type DateInputProps = {
  onChange: (data: any) => void;
};

type RegisterProps<T> = {
  route: Route<T>;
};

type RegisterRoute = {
  email: string;
  action: 'update' | 'insert';
  user: User;
};

type SuccessModal = {
  isOpen: boolean;
  submit?: (data?: any) => void;
  cancel?: (data?: any) => void;
};
