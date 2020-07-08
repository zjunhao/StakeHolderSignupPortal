import { Component, OnInit } from '@angular/core';
import { LoginModel } from '../../models/login-model';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { LocalstorageTokenService } from '../../services/localstorage-token.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  loginInfo: LoginModel = new LoginModel();
  loginErrorText: string = "";

  constructor(
    private loginService: UserService,
    private localstorageTokenService: LocalstorageTokenService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  signIn() {
    this.loginService.loginUser(this.loginInfo).subscribe(
      loginResponse => {
          this.loginErrorText = "";
          this.localstorageTokenService.setToken(loginResponse.token);
          this.router.navigate(['/dashboard']);
      },
      err => {
        this.loginErrorText = err.message;
      }
    );

  }
}
