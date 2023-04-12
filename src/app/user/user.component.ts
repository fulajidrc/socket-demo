import { Component } from '@angular/core';
import { SocketService } from '../services';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  
  constructor(private socketService:SocketService){}

  ngOnInit() {
    this.socketService.getAllUser();
  }
}
