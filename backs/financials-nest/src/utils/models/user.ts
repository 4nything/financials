export interface User {
  id: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
}

export interface SignInOptions {
  email: string;
  password: string;
}
