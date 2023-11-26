import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogMedicationsPage } from './log-medications.page';

describe('LogMedicationsPage', () => {
  let component: LogMedicationsPage;
  let fixture: ComponentFixture<LogMedicationsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LogMedicationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
