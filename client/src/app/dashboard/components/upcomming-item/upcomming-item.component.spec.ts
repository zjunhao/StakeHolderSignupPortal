import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcommingItemComponent } from './upcomming-item.component';

describe('UpcommingItemComponent', () => {
  let component: UpcommingItemComponent;
  let fixture: ComponentFixture<UpcommingItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpcommingItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpcommingItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
