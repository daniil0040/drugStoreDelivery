export type LoginInputs = {
  email: string;
  password: string;
};

export type SignupInputs = {
  name: string;
} & LoginInputs;
