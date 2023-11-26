import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SetReminderPage } from './set-reminder.page';

describe('SetReminderPage', () => {
  let component: SetReminderPage;
  let fixture: ComponentFixture<SetReminderPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SetReminderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
