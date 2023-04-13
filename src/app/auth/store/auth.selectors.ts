import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from './auth.reducer';

export const selectAuthState = createFeatureSelector<fromAuth.AuthState>(
  fromAuth.authFeatureKey
);

export const LOGIN_USER = createSelector(
  selectAuthState,
  state => state.user
)

export const IS_LOGIN = createSelector(
  selectAuthState,
  state => state.isLogin
)
