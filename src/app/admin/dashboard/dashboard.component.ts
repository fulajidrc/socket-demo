import { Component} from '@angular/core';
import { Store } from '@ngrx/store';
import { SocketService } from 'src/app/services';
import { authStore } from 'src/app/store';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  user$ = this.store.select(authStore.LOGIN_USER)
  constructor(
    private store:Store,
    private socketService:SocketService
  ){}
    
  ngOnInit(){
    this.verifyCookie();
  }

  logout(){
    this.socketService.logoutUser();
  }

  verifyCookie(){
    this.socketService.verifyCookie();
  }
}
