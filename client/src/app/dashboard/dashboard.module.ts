import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemListComponent } from './components/item-list/item-list.component';
import { ItemDetailComponent } from './components/item-detail/item-detail.component';
import { MatExpansionModule } from '@angular/material/expansion';


@NgModule({
  declarations: [ItemListComponent, ItemDetailComponent],
  imports: [
    CommonModule,
    MatExpansionModule
  ],
  exports: [
    ItemListComponent,
    ItemDetailComponent
  ]
})
export class DashboardModule { }
