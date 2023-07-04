export interface SuccessRegisterResponse {
  user: User;
}

export interface User {
  email: string;
  username: string;
  bio: any;
  image: string;
  token: string;
}
