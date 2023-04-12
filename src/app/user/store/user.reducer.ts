import { createFeature, createReducer, on } from '@ngrx/store';
import { User } from 'src/app/models';
import * as UserActions from './user.actions';

export const userFeatureKey = 'user';

export interface UserState {
  users:User[],
  user:User,
}

export const initialState: UserState = {
  users: [{name: 'test', email: 'test@gmail.com', _id: 'test'}],
  user: {name: '', email: ''}
};

export const reducer = createReducer(
  initialState,
  //on(UserActions.loadUsers, state => state),
  on(UserActions.setUsers, (state, {users}) => ({
    ...state,
    users: users
  })),
  on(UserActions.setUser, (state, {user}) => ({
    ...state,
    user: user
  })),
  on(UserActions.storeUser, (state, {user}) => ({
    ...state,
    users: [...state.users, user]
  })),
  on(UserActions.updateUser, (state, {user}) => ({
    ...state,
    users: state.users.map(item => item._id == user._id ? {...item, name: user.name, email: user.email} : item)
  })),
  on(UserActions.deleteUser, (state, {id}) => ({
    ...state,
    users: state.users.filter(item => item._id != id)
  }))

  
);

export const userFeature = createFeature({
  name: userFeatureKey,
  reducer,
});

