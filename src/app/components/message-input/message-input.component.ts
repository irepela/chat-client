import { ChangeDetectionStrategy, Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { EmojiEvent } from '@ctrl/ngx-emoji-mart/ngx-emoji';

@Component({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html',
  styleUrls: ['./message-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageInputComponent implements OnInit {

  @Input() set taggedUser(user: string) {
    this.text = this.text + user;
  }
  @Output() sendMessage = new EventEmitter<string>();

  text = '';
  showEmojiPicker = false;

  constructor() { }

  ngOnInit(): void {
  }

  onToggleEmojiPicker(): void {
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  onAddEmoji(event: EmojiEvent): void {
    this.text = `${this.text}${event.emoji.native}`;
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  onSendMsg(): void {
    this.sendMessage.emit(this.text);
    this.text = '';
  }

}
