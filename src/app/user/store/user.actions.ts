import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models';

export const loadUsers = createAction(
  '[User] Load Users'
);


export const setUsers = createAction(
  'SET_USERS',
  (users: User[]) => ({users})
);

export const storeUser = createAction(
  'ADD_USERS',
  (user: User) => ({user})
);

export const setUser = createAction(
  'SET_USER',
  (user: User) => ({user})
);

export const deleteUser = createAction(
  'DELETE_USER',
  (id:string) => ({id})
)

export const updateUser = createAction(
  'UPDATE_USER',
  (user:User) => ({user})
)



