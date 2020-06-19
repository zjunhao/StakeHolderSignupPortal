import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCreaterComponent } from './item-creater.component';

describe('ItemCreaterComponent', () => {
  let component: ItemCreaterComponent;
  let fixture: ComponentFixture<ItemCreaterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemCreaterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemCreaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
