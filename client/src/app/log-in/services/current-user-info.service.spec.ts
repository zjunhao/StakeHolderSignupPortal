import { TestBed } from '@angular/core/testing';

import { CurrentUserInfoService } from './current-user-info.service';

describe('CurrentUserInfoService', () => {
  let service: CurrentUserInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentUserInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
