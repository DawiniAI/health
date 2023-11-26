import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DrugDrugInteractionsPage } from './drug-drug-interactions.page';

describe('DrugDrugInteractionsPage', () => {
  let component: DrugDrugInteractionsPage;
  let fixture: ComponentFixture<DrugDrugInteractionsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DrugDrugInteractionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
