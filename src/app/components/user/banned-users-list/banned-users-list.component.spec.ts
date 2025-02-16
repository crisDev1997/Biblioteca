import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannedUsersListComponent } from './banned-users-list.component';

describe('BannedUsersListComponent', () => {
  let component: BannedUsersListComponent;
  let fixture: ComponentFixture<BannedUsersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BannedUsersListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BannedUsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
