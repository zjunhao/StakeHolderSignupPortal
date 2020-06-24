import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignupModel } from '../../models/signup-model';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signupInfo: SignupModel = new SignupModel();

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  signupUser() {
    this.loginService.signupUser(this.signupInfo).subscribe(()=>{
      // TODO: add error handling
      this.router.navigate(['/signupsucceed']);
    });
  }
}
