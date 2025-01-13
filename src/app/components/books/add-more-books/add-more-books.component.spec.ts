import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMoreBooksComponent } from './add-more-books.component';

describe('AddMoreBooksComponent', () => {
  let component: AddMoreBooksComponent;
  let fixture: ComponentFixture<AddMoreBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMoreBooksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMoreBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
