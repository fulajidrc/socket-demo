import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models';

export const loadAuths = createAction(
  '[Auth] Load Auths'
);

export const userLoginLogout = createAction(
  'USER_LOGIN',
  (user:User, isLogin:boolean) => ({user, isLogin})
);





