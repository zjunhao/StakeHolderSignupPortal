import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { UserService } from 'src/app/log-in/services/user.service';
import { CurrentUserModel } from 'src/app/log-in/models/get-current-user-response-model';
import { UserPrivilegeEnum } from 'src/app/log-in/enums/user-privilege-enum';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent implements OnInit {

  currentUser: CurrentUserModel = new CurrentUserModel();
  editMode: boolean = false;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.getCurrentUserInfo().subscribe( res => {
      if (res.success) {
        this.currentUser = res.user;
        this.editMode = this.currentUser.privilege.localeCompare(UserPrivilegeEnum.admin) === 0;
      } else {
        console.error('Fail to load current user information');
      }
    });
  }
}
