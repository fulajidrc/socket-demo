import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models';
import { SocketService } from 'src/app/services';
import { setUser } from '../../store/user.actions';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent {
  @Input() user!:User

  constructor(
    private store:Store,
    private socketService:SocketService
  ) {}

  editUser(user:User){
    this.store.dispatch(setUser(user))
  }

  deleteUser(user:User){
    const id = user._id ? user._id : ''
    this.socketService.deleteUser(id)
  }
}
