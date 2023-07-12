import { AuthState, RegisterState } from './../shared/models/register.state';
import { createReducer, on } from '@ngrx/store';
import { AuthAction, LogOutAction, registerAction } from './register.action';

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
  ),
  on(
    LogOutAction,
    (state): AuthState => ({
      ...state,
      email: '',
      username: '',
      image: '',
      loggedIn: false,
    })
  )
);
