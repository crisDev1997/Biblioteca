import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateNumJournalComponent } from './update-num-journal.component';

describe('UpdateNumJournalComponent', () => {
  let component: UpdateNumJournalComponent;
  let fixture: ComponentFixture<UpdateNumJournalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateNumJournalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateNumJournalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
