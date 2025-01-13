import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddJournalLoanComponent } from './add-journal-loan.component';

describe('AddJournalLoanComponent', () => {
  let component: AddJournalLoanComponent;
  let fixture: ComponentFixture<AddJournalLoanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddJournalLoanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddJournalLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
