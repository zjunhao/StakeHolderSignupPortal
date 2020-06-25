import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDetailNoneditmodeComponent } from './item-detail-noneditmode.component';

describe('ItemDetailNoneditmodeComponent', () => {
  let component: ItemDetailNoneditmodeComponent;
  let fixture: ComponentFixture<ItemDetailNoneditmodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemDetailNoneditmodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemDetailNoneditmodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
