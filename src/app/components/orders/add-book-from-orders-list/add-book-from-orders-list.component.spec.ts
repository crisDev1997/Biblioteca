import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBookFromOrdersListComponent } from './add-book-from-orders-list.component';

describe('AddBookFromOrdersListComponent', () => {
  let component: AddBookFromOrdersListComponent;
  let fixture: ComponentFixture<AddBookFromOrdersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBookFromOrdersListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBookFromOrdersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
