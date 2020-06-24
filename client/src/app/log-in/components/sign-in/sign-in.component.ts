import { Component, OnInit } from '@angular/core';
import { LoginModel } from '../../models/login-model';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  loginInfo: LoginModel = new LoginModel();

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  signIn() {
    this.loginService.loginUser(this.loginInfo).subscribe(user => {
      localStorage.setItem("currentUser", JSON.stringify(user));
    });
    console.log(localStorage.getItem("currentUser"));
    this.router.navigate(['/dashboard']);
  }
}
