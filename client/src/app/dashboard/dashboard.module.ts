import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemListComponent } from './components/item-list/item-list.component';
import { ItemDetailComponent } from './components/item-detail/item-detail.component';



@NgModule({
  declarations: [ItemListComponent, ItemDetailComponent],
  imports: [
    CommonModule
  ],
  exports: [
    ItemListComponent,
    ItemDetailComponent
  ]
})
export class DashboardModule { }
