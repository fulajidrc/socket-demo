import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { LoginUser, User } from '../models';
import { deleteUser, setUser, setUsers, storeUser, updateUser } from '../user/store/user.actions';
import { userLoginLogout } from '../auth/store/auth.actions';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

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
    private store:Store,
    private router: Router,
    private cookieService: CookieService
  ) { 
    this.socket = io('http://localhost:3000',{
      transports: ['websocket'],
      withCredentials: true
    });

    this.socket.on('message', response => this.getResponse(response));

    this.socket.on('cookie', (cookieValue: string) => {
      document.cookie = cookieValue
      this.socket.emit('cookieReceived');
      console.log('Cookie set successfully!');
    });
    
  }

  getResponse(response:ResponseData){
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
      
      case 'SUCCESS_LOGIN':
          const user:User = {...response.data.user, accessToken: response.data.accessToken}
          this.store.dispatch(userLoginLogout(user, true))
          this.router.navigate(['/dashboard'])

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

  logoutUser(){
          const user:User = {
            name: '',
            email: '',
          };
          this.store.dispatch(userLoginLogout(user, false))
          this.router.navigate(['/login'])
  }

  verifyCookie(){
    this.socket.emit('verifyCookie',{data:'test'});
  }
}
