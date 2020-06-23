import { Component, OnInit } from '@angular/core';
import { SignupModel } from '../../models/signup-model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signupInfo: SignupModel = new SignupModel();

  constructor() { }

  ngOnInit(): void {
  }

  signupUser() {

  }
}
