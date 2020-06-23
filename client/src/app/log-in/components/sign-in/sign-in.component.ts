import { Component, OnInit } from '@angular/core';
import { LoginModel } from '../../models/login-model';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  loginInfo: LoginModel = new LoginModel();

  constructor() { }

  ngOnInit(): void {
  }

  signIn() {
    
  }
}
