import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../shared/models/register.state';

export const getUsername = createFeatureSelector<AuthState>('auth');

export const selectFeatureUsername = createSelector(
  getUsername,
  (state: AuthState) => ({ username: state.username, loggedIn: state.loggedIn })
);
