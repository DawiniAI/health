import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AutoRefillPage } from './auto-refill.page';

describe('AutoRefillPage', () => {
  let component: AutoRefillPage;
  let fixture: ComponentFixture<AutoRefillPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AutoRefillPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
