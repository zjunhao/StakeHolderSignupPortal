import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list'
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { RouterModule } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ItemDetailComponent } from './components/item-detail/item-detail.component';
import { ItemCreaterComponent } from './components/item-creater/item-creater.component';
import { ItemDetailEditmodeComponent } from './components/item-detail/item-detail-editmode/item-detail-editmode.component';
import { ItemDetailNoneditmodeComponent } from './components/item-detail/item-detail-noneditmode/item-detail-noneditmode.component';
import { HeaderBarComponent } from './components/header-bar/header-bar.component';
import { DateTimeFormatterPipe } from './pipes/date-time-formatter.pipe';
import { SharedModule } from '../shared/shared.module';
import { UpcommingItemComponent } from './components/upcomming-item/upcomming-item.component';
import { FilteredItemComponent } from './components/filtered-item/filtered-item.component';
import { ItemListComponent } from './components/item-list/item-list.component';


@NgModule({
  declarations: [
    ItemListComponent, 
    ItemDetailComponent, 
    DashboardComponent, 
    ItemCreaterComponent, 
    ItemDetailEditmodeComponent, 
    ItemDetailNoneditmodeComponent, 
    HeaderBarComponent, 
    DateTimeFormatterPipe, 
    UpcommingItemComponent, 
    FilteredItemComponent, 
    ItemListComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatExpansionModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatTooltipModule,
    MatDialogModule,
    MatTabsModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule
  ],
  exports: []
})
export class DashboardModule { }
