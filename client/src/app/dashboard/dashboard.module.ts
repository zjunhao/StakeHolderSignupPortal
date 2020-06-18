import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';



@NgModule({
  declarations: [ItemListComponent, ItemDetailComponent],
  imports: [
    CommonModule
  ]
})
export class DashboardModule { }
