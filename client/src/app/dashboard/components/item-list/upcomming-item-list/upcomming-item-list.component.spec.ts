import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcommingItemListComponent } from './upcomming-item-list.component';

describe('UpcommingItemListComponent', () => {
  let component: UpcommingItemListComponent;
  let fixture: ComponentFixture<UpcommingItemListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpcommingItemListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpcommingItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
