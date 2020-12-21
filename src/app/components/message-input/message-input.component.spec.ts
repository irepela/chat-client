import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageInputComponent } from './message-input.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('MessageInputComponent', () => {
  let component: MessageInputComponent;
  let fixture: ComponentFixture<MessageInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageInputComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
