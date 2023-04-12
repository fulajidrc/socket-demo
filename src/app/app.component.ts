import { Component } from '@angular/core';
import { SocketService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'socket-demo';
  constructor(
    private chatService: SocketService,
  ) { }

  ngOnInit() {
    // this.chatService.onNewMessage().subscribe(msg => {
    //   console.log('got a msg: ' + msg);
    // });
  }
}
