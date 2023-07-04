import { RegisterState } from './../shared/models/register.state';
import { createReducer, on } from '@ngrx/store';
import { registerAction } from './register.action';

export const initialState: RegisterState = {
  submitted: false,
};

export const registerReducer = createReducer(
  initialState,
  on(registerAction, (state): RegisterState => ({ ...state, submitted: true }))
);
