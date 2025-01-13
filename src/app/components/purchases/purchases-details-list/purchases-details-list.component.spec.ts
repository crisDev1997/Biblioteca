import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasesDetailsListComponent } from './purchases-details-list.component';

describe('PurchasesDetailsListComponent', () => {
  let component: PurchasesDetailsListComponent;
  let fixture: ComponentFixture<PurchasesDetailsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchasesDetailsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasesDetailsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
