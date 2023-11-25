import { ComponentFixture, TestBed } from '@angular/core/testing';
import { YourMedicationsPage } from './your-medications.page';

describe('YourMedicationsPage', () => {
  let component: YourMedicationsPage;
  let fixture: ComponentFixture<YourMedicationsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(YourMedicationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
