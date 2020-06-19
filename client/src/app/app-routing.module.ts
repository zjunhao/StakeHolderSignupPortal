import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemListComponent } from './dashboard/components/item-list/item-list.component';
import { ItemDetailComponent } from './dashboard/components/item-detail/item-detail.component';
import { DashboardComponent } from './dashboard/components/dashboard/dashboard.component';


const routes: Routes = [
  { path:'', redirectTo:'dashboard', pathMatch:'full' },
  { path:'dashboard', component:DashboardComponent },
  { path:'itemdetail/:id', component:ItemDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
