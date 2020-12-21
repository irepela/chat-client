import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Message } from './model/message';

@Component({
  selector: 'app-message-row',
  templateUrl: './message-row.component.html',
  styleUrls: ['./message-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageRowComponent implements OnInit {

  @Input() message: Message | undefined;
  @Output() sendUserTag = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onUserDblClick(user: string | undefined): void {
    this.sendUserTag.emit(user);
  }

}
