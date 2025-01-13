import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserBanComponent } from './add-user-ban.component';

describe('AddUserBanComponent', () => {
  let component: AddUserBanComponent;
  let fixture: ComponentFixture<AddUserBanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUserBanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserBanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
