import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBanComponent } from './edit-ban.component';

describe('EditBanComponent', () => {
  let component: EditBanComponent;
  let fixture: ComponentFixture<EditBanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditBanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
