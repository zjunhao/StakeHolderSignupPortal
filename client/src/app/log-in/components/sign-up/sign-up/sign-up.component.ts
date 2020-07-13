import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { SignupModel } from 'src/app/log-in/models/signup-model';
import { UserService } from 'src/app/log-in/services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signupInfo: SignupModel = new SignupModel();
  errorMessage: string;

  // form controls
  emailFC = new FormControl('', [Validators.required, Validators.email]);
  nameFC = new FormControl('', [Validators.required]);
  passwordFC = new FormControl('', [Validators.required]);
  confirmPwdFC = new FormControl('', []);

  constructor(
    private loginService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  signupUser() {
    if (this.nameFC.valid && this.emailFC.valid && this.passwordFC.valid && this.confirmPwdFC.valid) {
      this.loginService.signupUser(this.signupInfo).subscribe((res)=>{
        if (res.success) {
          this.errorMessage = '';
          this.router.navigate(['/signupsucceed']);
        } else {
          this.errorMessage = res.message;
        }
      });
    }
  }

  getEmailErrorMessage() {
    if (this.emailFC.hasError('required')) {
      return 'Email cannot be empty';
    } else if (this.emailFC.hasError('email')){
      return 'Not a valid email address';
    } else {
      return '';
    }
  }

  getNameErrorMessage() {
    if (this.nameFC.hasError('required')) {
      return 'Name cannot be empty';
    } else {
      return '';
    }
  }

  getPasswordErrorMessage() {
    if (this.passwordFC.hasError('required')) {
      return 'Password cannot be empty';
    } else {
      return '';
    }
  }

  getConfirmPwdErrorMessage() {

  }
}
