import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/log-in/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-begin-password-reset',
  templateUrl: './begin-password-reset.component.html',
  styleUrls: ['./begin-password-reset.component.scss']
})
export class BeginPasswordResetComponent implements OnInit {

  userInputEmail: string;
  errMessage: string;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  sendPasswordResetEmail() {
    if (!this.userInputEmail) {
      this.errMessage = 'Email cannot be empty';
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.userInputEmail)) {
      this.errMessage = 'Email address not valid';
    } else {
      this.userService.sendPasswordResetEmail(this.userInputEmail).subscribe(
        res => {
          this.errMessage = '';
          this.router.navigate(['/reset_email_sent']);
        },
        err => {
          this.errMessage = err.message;
        }
      );
    }

  }

}
