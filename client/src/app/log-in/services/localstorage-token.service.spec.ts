import { TestBed } from '@angular/core/testing';

import { LocalstorageTokenService } from './localstorage-token.service';

describe('LocalstorageTokenService', () => {
  let service: LocalstorageTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalstorageTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
