import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilteredItemComponent } from './filtered-item.component';

describe('FilteredItemComponent', () => {
  let component: FilteredItemComponent;
  let fixture: ComponentFixture<FilteredItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilteredItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilteredItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
