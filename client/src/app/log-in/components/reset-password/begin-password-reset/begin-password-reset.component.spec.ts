import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeginPasswordResetComponent } from './begin-password-reset.component';

describe('BeginPasswordResetComponent', () => {
  let component: BeginPasswordResetComponent;
  let fixture: ComponentFixture<BeginPasswordResetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeginPasswordResetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeginPasswordResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
