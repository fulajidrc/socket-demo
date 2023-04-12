import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { LoginUser, User } from '../models';
import { deleteUser, setUser, setUsers, storeUser, updateUser } from '../user/store/user.actions';
interface ResponseData{
  type: string,
  data?: any
}
@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket!: Socket;
  getUsers = false
  constructor(
    private store:Store
  ) { 
    this.socket = io('http://localhost:3000',{
      transports: ['websocket'],
    });

    this.socket.on('message', response => this.getResponse(response));
  }

  getResponse(response:ResponseData){
    console.log(response);
    switch (response.type) {
      case 'USERS':
          this.store.dispatch(setUsers(response.data))
        break;
      
      case 'ADD_USER':
          delete response.data.password
          this.store.dispatch(storeUser(response.data))
        break;
      
      case 'UPDATE_USER':
          delete response.data.password
          this.store.dispatch(updateUser(response.data))
        break;
      
      case 'DELETE_USER':
          this.store.dispatch(deleteUser(response.data))
        break;
        
      default:
        break;
    }
  }


  // EMITTER function
  
  //send message
  sendMessage(msg: string) {
    // console.log('send test message');
    this.socket.emit('test', { message: msg });
  }

  //get all users
  getAllUser(){
    console.log('call get User function'); 
    this.getUsers ? '' : this.socket.emit('findAllUsers');
  }

  //add users 
  createUser(user:User){
    this.socket.emit('createUser', user);
    this.store.dispatch(setUser({name: '', email: ''}))
  }

  updateUser(user:User){
    console.log('update user call');
    this.socket.emit('updateUser', user);
    this.store.dispatch(setUser({name: '', email: ''}))
  }

  deleteUser(id:string){
    this.socket.emit('removeUser', id);
  }

  loginUser(loginUser:LoginUser){
    this.socket.emit('loginUser',loginUser);
  }
}
