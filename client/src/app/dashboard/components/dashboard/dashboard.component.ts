import { Component, OnInit, ViewChild } from '@angular/core';
import { ItemListComponent } from '../item-list/item-list.component';
import { UserPrivilegeEnum } from 'src/app/log-in/enums/user-privilege-enum';
import { UserService } from 'src/app/log-in/services/user.service';
import { UpcommingItemComponent } from '../upcomming-item/upcomming-item.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})

export class DashboardComponent implements OnInit {
  editMode: boolean = false;
  @ViewChild(UpcommingItemComponent) upcommingItem: UpcommingItemComponent;
  
  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    // this.editMode = true;

    this.userService.getCurrentUserInfo().subscribe(res => {
      if (res.success) {
        const currUserPrivilege = res.user.privilege;
        this.editMode = currUserPrivilege.localeCompare(UserPrivilegeEnum.admin)===0 ? true : false;
      } else {
        console.error('Fail to get current user privilege');
      }
    })
  }

  refreshList() {
    this.upcommingItem.refreshList();
  }
}
