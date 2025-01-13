import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoEditAdminComponent } from './info-edit-admin.component';

describe('InfoEditAdminComponent', () => {
  let component: InfoEditAdminComponent;
  let fixture: ComponentFixture<InfoEditAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoEditAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoEditAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
