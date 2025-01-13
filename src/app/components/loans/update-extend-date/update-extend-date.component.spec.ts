import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateExtendDateComponent } from './update-extend-date.component';

describe('UpdateExtendDateComponent', () => {
  let component: UpdateExtendDateComponent;
  let fixture: ComponentFixture<UpdateExtendDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateExtendDateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateExtendDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
