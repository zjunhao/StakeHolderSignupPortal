import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDetailEditmodeComponent } from './item-detail-editmode.component';

describe('ItemDetailEditmodeComponent', () => {
  let component: ItemDetailEditmodeComponent;
  let fixture: ComponentFixture<ItemDetailEditmodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemDetailEditmodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemDetailEditmodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
