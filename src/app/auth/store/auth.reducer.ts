import { createFeature, createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { User } from 'src/app/models';

export const authFeatureKey = 'auth';

export interface AuthState {
  user?:User,
  isLogin: boolean
}

export const initialState: AuthState = {
  isLogin: false
};

export const reducer = createReducer(
  initialState,
  on(AuthActions.loadAuths, state => state),
  on(AuthActions.userLoginLogout, (state, {user, isLogin}) => (
    {
      ...state,
      user: user,
      isLogin: isLogin
    }
  ))
);

// export const authFeature = createFeature({
//   name: authFeatureKey,
//   reducer,
// });

