import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CurrentUserInfoService } from '../../services/current-user-info.service';

@Component({
  selector: 'app-promote-user',
  templateUrl: './promote-user.component.html',
  styleUrls: ['./promote-user.component.scss']
})
/** Promoting user to be system admin */
export class PromoteUserComponent implements OnInit {
  promoteErrMsg: string;
  promoteSucceedMsg: string;
  userInputPasscode: string;

  constructor(
    private loginService: UserService,
    private currentUserService: CurrentUserInfoService
  ) { }

  ngOnInit(): void {
  }

  /** Make current user account as administrator. */ 
  promoteUser() {
    this.loginService.promoteUser(this.currentUserService.getId(), this.userInputPasscode).subscribe(res => {
      if (res.success) {
        this.promoteErrMsg = '';
        this.promoteSucceedMsg = 'Your account has been promoted to administrator, please log out and log back in for it to take effect';
      } else {
        this.promoteErrMsg = res.message;
        this.promoteSucceedMsg = '';
      }
    });
  }

  logOutUser() {
    this.loginService.logOutUser();
  }
}
