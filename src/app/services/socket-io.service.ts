import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { environment } from '../../environments/environment';
import { Socket } from 'socket.io-client/build/socket';
import { Message } from '../components/message-row/model/message';
import { Observable } from 'rxjs';
import { ChatEvent } from '../app-constant';

@Injectable({
  providedIn: 'root'
})
export class SocketIOService {

  private socket: Socket;

  constructor() {
    this.socket = io(environment.SOCKET_ENDPOINT);
  }

  public registerUser(userName: string): void {
    this.socket.emit(ChatEvent.REGISTER, userName);
  }

  public sendMessage(message: Message): void {
    this.socket.emit(ChatEvent.MESSAGE, message);
  }

  public receiveMessages(): Observable<Message[]> {
    return new Observable<Message[]>(observer => {
      this.socket.on(ChatEvent.MESSAGE, (data: Message[]) => observer.next(data));
    });
  }

  public receiveUsers(): Observable<string[]> {
    return new Observable<string[]>(observer => {
      this.socket.on(ChatEvent.REGISTER, (data: string[]) => observer.next(data));
    });
  }
}
