import { Component, OnInit } from '@angular/core';
import { SocketIOService } from './services/socket-io.service';
import { Message } from './components/message-row/model/message';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'Chat client';
  userTag = '';
  userName = '';

  messages$: Observable<Message[]>;
  users$: Observable<string[] | null>;

  constructor(private socketService: SocketIOService) {
    this.messages$ = this.socketService.receiveMessages();
    this.users$ = this.socketService.receiveUsers();
  }

  ngOnInit(): void {
    do {
      this.userName = prompt('Please enter your name', '') || '';
    }
    while (!this.userName);
    this.socketService.registerUser(this.userName);
  }

  onSendMessage(message: string): void {
    if (!message) {
      return;
    }

    this.socketService.sendMessage({
      time: new Date(),
      userName: this.userName,
      text: message
    });
  }

  onSendUserTag(user: string): void {
    this.userTag = '@' + user;
  }
}
