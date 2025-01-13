import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExtendDateComponent } from './add-extend-date.component';

describe('AddExtendDateComponent', () => {
  let component: AddExtendDateComponent;
  let fixture: ComponentFixture<AddExtendDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddExtendDateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExtendDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
