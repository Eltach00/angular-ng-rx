import { User } from './register/succes.register.response';
export interface RegisterState {
  submitted: boolean;
}
export interface AuthState extends Omit<User, 'token'> {
  loggedIn: boolean;
}
