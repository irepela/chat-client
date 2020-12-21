import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as path from 'path';
import * as http from 'http';
import { ChatEvent } from './constant';
import { ChatMessage } from './types';
import { Server, Socket } from 'socket.io';

const app: express.Application = express();

app.set('port', (process.env.PORT || 80));
app.use(express.static(path.join(__dirname, '../')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files
app.get('/chat-client*', (req, res) => {
  res.sendFile(path.resolve(path.join(__dirname, '../chat-client/index.html')));
});

// Create server
const server = new http.Server(app);
server.listen(app.get('port'), '127.0.0.1', () => {
  console.log('Open http://localhost/chat-client url');
});

const io = new Server(server);
const userList: string[] = [];
const messages: ChatMessage[] = [];

// socket events
io.on(ChatEvent.CONNECT, (socket: Socket) => {
  console.log('Client connected.');

  // Register new user
  socket.on(ChatEvent.REGISTER, (userName: string) => {
    userList.push(userName);
    io.emit(ChatEvent.REGISTER, userList);
    io.emit(ChatEvent.MESSAGE, messages);
  });

  // Send message back to all clients
  socket.on(ChatEvent.MESSAGE, (msg: ChatMessage) => {
    messages.push(msg);
    io.emit(ChatEvent.MESSAGE, messages);
  });

  socket.on(ChatEvent.DISCONNECT, () => {
    console.log('Client disconnected');
  });

});

export { app };
