import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordResetEmailSentComponent } from './password-reset-email-sent.component';

describe('PasswordResetEmailSentComponent', () => {
  let component: PasswordResetEmailSentComponent;
  let fixture: ComponentFixture<PasswordResetEmailSentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordResetEmailSentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordResetEmailSentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
