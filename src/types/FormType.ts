export type LoginInputs = {
  email: string;
  password: string;
  phone: string;
};

export type SignupInputs = {
  name: string;
} & LoginInputs;
