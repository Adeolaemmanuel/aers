type AuthSate = {
  is_authenticated?: boolean;
  access_token?: string;
  user: Partial<User>;
};
type User = BaseState & {
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  designation: string;
  is_contactable: boolean
};
type StorageState = AuthSate;

type BaseState = {
  readonly id: number;
  created_at: string;
  updated_at: string;
  metadata: string;
};

type DesignationState = BaseState & {
  id: string;
  name: string;
  slug: string;
};

type Questions = BaseState & {
  question: string;
  input_type: string;
  options: any;
  stage: Stage;
};

type Answers = BaseState & {
  user_id: string;
  value: string;
  values: string[];
  question: Questions;
};

type Stage = BaseState & {
  name: string;
  slug: string;
};
