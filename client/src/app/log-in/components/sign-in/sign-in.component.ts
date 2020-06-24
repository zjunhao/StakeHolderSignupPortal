import { Component, OnInit } from '@angular/core';
import { LoginModel } from '../../models/login-model';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { UserModel } from '../../../shared/models/user-model';

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
      if (user !== null) {
        // user credential is valid
        const errorElem = document.getElementById('login-error');
        errorElem.innerHTML = '';
        localStorage.setItem("currentUser", JSON.stringify(user));
        console.log(localStorage.getItem("currentUser"));
        this.router.navigate(['/dashboard']);
      } else {
        // user credential not correct
        const errorElem = document.getElementById('login-error');
        errorElem.innerHTML = 'Email / Password not correct.';
      }
    });

  }
}
