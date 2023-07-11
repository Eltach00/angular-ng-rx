import { User } from './register/succes.register.response';
export interface RegisterState {
  submitted: boolean;
}
export interface AuthState {
  email: string;
  username: string;
  image: string;
  loggedIn: boolean;
}
