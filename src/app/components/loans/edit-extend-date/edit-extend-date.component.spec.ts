import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditExtendDateComponent } from './edit-extend-date.component';

describe('EditExtendDateComponent', () => {
  let component: EditExtendDateComponent;
  let fixture: ComponentFixture<EditExtendDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditExtendDateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditExtendDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
