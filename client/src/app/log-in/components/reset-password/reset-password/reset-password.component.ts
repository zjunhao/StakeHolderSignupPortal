import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/log-in/services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  newPassword: string;
  confirmNewPassword: string;
  // We assign a value here rather than use empty string, so that if no pwd reset token is extracted,
  // we'll request .../user/resetPassword/emptytoken, which still hit the correct endpoint in server.
  passwordResetToken: string = 'emptytoken'; 

  errorMessage: string;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // extract password reset token from url
    this.route.params.forEach((params: Params) => {
      if (params['resetPwdToken'] !== undefined) {
        this.passwordResetToken = params['resetPwdToken'];
      } 
    });
  }

  resetPassword() {
    if (!this.newPassword) {
      this.errorMessage = 'New password cannot be empty';
    } else if (this.newPassword.localeCompare(this.confirmNewPassword) !== 0) {
      this.errorMessage = 'Passwords do not match';
    } else {
      this.userService.resetPassword(this.passwordResetToken, this.newPassword).subscribe(
        res => {
          this.errorMessage = '';
          this.router.navigateByUrl('/password_reset_succeed');
        }, 
        err => {
          this.errorMessage = err.message;
        }
      );
    }

  }

}
