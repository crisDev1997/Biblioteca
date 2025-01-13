import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNumJournalComponent } from './edit-num-journal.component';

describe('EditNumJournalComponent', () => {
  let component: EditNumJournalComponent;
  let fixture: ComponentFixture<EditNumJournalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditNumJournalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditNumJournalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
