import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { DashboardService } from '../../services/dashboard.service';
import { ApiListItemModel, ListItemModel } from '../../models/item-list-response-model';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationDialogComponent } from 'src/app/shared/components/delete-confirmation-dialog/delete-confirmation-dialog.component';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {


  @Input() editMode: boolean;

  constructor(
  ) { }

  ngOnInit(): void {

  }

}
