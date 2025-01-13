import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNumJournalComponent } from './add-num-journal.component';

describe('AddNumJournalComponent', () => {
  let component: AddNumJournalComponent;
  let fixture: ComponentFixture<AddNumJournalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNumJournalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNumJournalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
