import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtendedLoansListComponent } from './extended-loans-list.component';

describe('ExtendedLoansListComponent', () => {
  let component: ExtendedLoansListComponent;
  let fixture: ComponentFixture<ExtendedLoansListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtendedLoansListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtendedLoansListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
