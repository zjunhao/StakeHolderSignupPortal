import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemListComponent } from './components/item-list/item-list.component';
import { ItemDetailComponent } from './components/item-detail/item-detail.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list'
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [ItemListComponent, ItemDetailComponent],
  imports: [
    CommonModule,
    MatExpansionModule,
    MatListModule,
    MatCardModule
  ],
  exports: [
    ItemListComponent,
    ItemDetailComponent
  ]
})
export class DashboardModule { }
