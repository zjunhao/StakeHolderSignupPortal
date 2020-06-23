import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpSucceedMessagePageComponent } from './sign-up-succeed-message-page.component';

describe('SignUpSucceedMessagePageComponent', () => {
  let component: SignUpSucceedMessagePageComponent;
  let fixture: ComponentFixture<SignUpSucceedMessagePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpSucceedMessagePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpSucceedMessagePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
