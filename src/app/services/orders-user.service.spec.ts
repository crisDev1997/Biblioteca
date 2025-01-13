import { TestBed } from '@angular/core/testing';

import { OrdersUserService } from './orders-user.service';

describe('OrdersUserService', () => {
  let service: OrdersUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrdersUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
