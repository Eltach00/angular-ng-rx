import { createAction, props } from '@ngrx/store';
import { RegisterActions } from './enums/register.enum';
import { RegisterDto } from '../shared/models/register.dto';
import { User } from '../shared/models/register/succes.register.response';

export const registerAction = createAction(
  RegisterActions.REGISTER,
  props<RegisterDto>()
);
export const AuthAction = createAction(RegisterActions.AUTHED, props<User>());
