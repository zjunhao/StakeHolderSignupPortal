import { Component, OnInit, ViewChild } from '@angular/core';
import { ItemListComponent } from '../item-list/item-list.component';
import { CurrentUserInfoService } from '../../../log-in/services/current-user-info.service';
import { UserPrivilegeEnum } from 'src/app/log-in/enums/user-privilege-enum';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})

export class DashboardComponent implements OnInit {
  editMode: boolean = false;
  @ViewChild(ItemListComponent) itemList: ItemListComponent;
  
  constructor(
    private currentUserService: CurrentUserInfoService
  ) { }

  ngOnInit(): void {
    if (this.currentUserService.getPrivilege().localeCompare(UserPrivilegeEnum.admin) === 0) {
      this.editMode = true;
    }
    // this.editMode = true;
  }

  refreshList() {
    this.itemList.refreshList();
  }
}
