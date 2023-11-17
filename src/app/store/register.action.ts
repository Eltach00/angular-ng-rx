import { createAction, props } from '@ngrx/store';
import { RegisterActions } from './enums/register.enum';
import { User } from '../shared/models/register/succes.register.response';
import { RegisterDTO } from '../shared/models/register.dto';

export const registerAction = createAction(
  RegisterActions.REGISTER,
  props<RegisterDTO>()
);
export const AuthAction = createAction(RegisterActions.AUTHED, props<User>());
export const LogOutAction = createAction(RegisterActions.LOGOUT);
