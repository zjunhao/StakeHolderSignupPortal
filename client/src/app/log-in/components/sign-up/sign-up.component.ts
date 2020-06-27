import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignupModel } from '../../models/signup-model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signupInfo: SignupModel = new SignupModel();
  errorMessage: string;

  constructor(
    private loginService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  signupUser() {
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
