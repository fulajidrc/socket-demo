import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectedUsers } from '../store/user.selectors';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  users$ = this.store.select(selectedUsers)
  constructor(private store:Store){}
}
