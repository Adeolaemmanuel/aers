type CreateUser = {
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  designation_id: number;
  is_contactable: boolean;
};

type InsertAnswers = {
  [key: string]: string | string[];
};
