import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilteredItemListComponent } from './filtered-item-list.component';

describe('FilteredItemListComponent', () => {
  let component: FilteredItemListComponent;
  let fixture: ComponentFixture<FilteredItemListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilteredItemListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilteredItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
