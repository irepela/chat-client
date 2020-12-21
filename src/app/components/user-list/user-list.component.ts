import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent implements OnInit {

  @Input() users: string[] | null = [];
  @Output() sendUserTag = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onUserDblClick(user: string): void {
    this.sendUserTag.emit(user);
  }

}
