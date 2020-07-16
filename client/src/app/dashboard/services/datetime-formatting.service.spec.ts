import { TestBed } from '@angular/core/testing';

import { DatetimeFormattingService } from './datetime-formatting.service';

describe('DatetimeFormattingService', () => {
  let service: DatetimeFormattingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatetimeFormattingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
