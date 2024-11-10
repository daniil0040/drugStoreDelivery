export type LoginInputs = {
  email: string;
  password: string;
  phone: string;
};

export type SignupInputs = {
  name: string;
} & LoginInputs;

export type CreateOrderValues = {
  name: string;
  email: string;
  phone: string;
  address: string;
  recaptcha: string;
};

export type TSettingsValues = {
  displayName: string;
  phoneNumber: string;
  photoFile: null | File;
};
