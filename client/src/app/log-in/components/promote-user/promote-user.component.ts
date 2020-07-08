import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserPrivilegeEnum } from '../../enums/user-privilege-enum';
import { CurrentUserModel } from '../../models/get-current-user-response-model';


@Component({
  selector: 'app-promote-user',
  templateUrl: './promote-user.component.html',
  styleUrls: ['./promote-user.component.scss']
})
/** Promoting user to be system admin */
export class PromoteUserComponent implements OnInit {
  promoteErrMsg: string;
  promoteSucceedMsg: string;
  unAdminErrMsg: string;
  unAdminSucceedMsg: string;

  userInputPasscode: string;

  currentUser: CurrentUserModel = new CurrentUserModel();

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.getCurrentUserInfo().subscribe(res => {
      if (res.success) {
        this.currentUser = res.user;
      }
    })
  }

  /** Make current user account as administrator. */ 
  promoteUser() {
    this.userService.promoteUser(this.currentUser._id, this.userInputPasscode).subscribe(res => {
      if (res.success) {
        this.promoteErrMsg = '';
        this.promoteSucceedMsg = 'Your account has been promoted to administrator, please log out and log back in for it to take effect';
      } else {
        this.promoteErrMsg = res.message;
        this.promoteSucceedMsg = '';
      }
    });
  }

  /** Remove administrator privilege from current user */
  removeUserAdmin() {
    this.userService.removeUserAdmin(this.currentUser._id).subscribe(res => {
      if (res.success) {
        this.unAdminErrMsg = '';
        this.unAdminSucceedMsg = 'Your account is no longer administrator, please log out and log back in for it to take effect';
      } else {
        this.unAdminErrMsg = res.message;
        this.unAdminSucceedMsg = '';
      }
    })
  }

  logOutUser() {
    this.userService.logOutUser();
  }

  isUserAdmin(): boolean {
    if (this.currentUser.privilege) {
      return this.currentUser.privilege.localeCompare(UserPrivilegeEnum.admin) === 0;
    } else {
      return false;
    }
  }
  
}
