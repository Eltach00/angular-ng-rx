import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RegisterState } from '../shared/models/register.state';

export const authFeature = createFeatureSelector<RegisterState>('auth');

export const selectIsSubmiting = createSelector(
  authFeature,
  (state: RegisterState) => state.submitted
);
