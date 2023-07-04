import { createAction, props } from '@ngrx/store';
import { RegisterActions } from './enums/register.enum';
import { RegisterDto } from '../shared/models/register.dto';

export const registerAction = createAction(
  RegisterActions.REGISTER,
  props<RegisterDto>()
);
