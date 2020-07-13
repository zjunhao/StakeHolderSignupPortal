import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordSucceedComponent } from './reset-password-succeed.component';

describe('ResetPasswordSucceedComponent', () => {
  let component: ResetPasswordSucceedComponent;
  let fixture: ComponentFixture<ResetPasswordSucceedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetPasswordSucceedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordSucceedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
