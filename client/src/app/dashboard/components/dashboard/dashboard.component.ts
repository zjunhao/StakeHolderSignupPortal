import { Component, OnInit, ViewChild } from '@angular/core';
import { ItemListComponent } from '../item-list/item-list.component';
import { CurrentUserService } from '../../services/current-user.service';
import { UserPrivilegeEnum } from 'src/app/shared/enums/user-privilege-enum';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})

export class DashboardComponent implements OnInit {
  editMode: boolean = false;
  @ViewChild(ItemListComponent) itemList: ItemListComponent;
  
  constructor(
    private currentUserService: CurrentUserService
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
