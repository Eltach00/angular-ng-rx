import { AuthState, RegisterState } from './../shared/models/register.state';
import { createReducer, on } from '@ngrx/store';
import { AuthAction, registerAction } from './register.action';

export const initialState: RegisterState = {
  submitted: false,
};
export const authState: AuthState = {
  email: '',
  image: '',
  username: '',
  loggedIn: false,
};

export const AuthReducer = createReducer(
  authState,
  on(
    AuthAction,
    (state, action): AuthState => ({
      ...state,
      email: action.email,
      username: action.username,
      image: action.image,
      loggedIn: true,
    })
  )
);
