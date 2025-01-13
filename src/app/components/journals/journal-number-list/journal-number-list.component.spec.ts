import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalNumberListComponent } from './journal-number-list.component';

describe('JournalNumberListComponent', () => {
  let component: JournalNumberListComponent;
  let fixture: ComponentFixture<JournalNumberListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JournalNumberListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JournalNumberListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
