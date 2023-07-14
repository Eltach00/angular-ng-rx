import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../shared/models/register.state';

export const getAuth = createFeatureSelector<AuthState>('auth');

export const selectFeatureUsername = createSelector(
  getAuth,
  (state: AuthState) => ({
    username: state.username,
    loggedIn: state.loggedIn,
    profileUrl: state.image,
  })
);
export const selectAuth = createSelector(getAuth, (state: AuthState) => state);
