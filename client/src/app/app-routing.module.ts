import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemListComponent } from './dashboard/components/item-list/item-list.component';
import { ItemDetailComponent } from './dashboard/components/item-detail/item-detail.component';
import { DashboardComponent } from './dashboard/components/dashboard/dashboard.component';
import { SignInComponent } from './log-in/components/sign-in/sign-in.component';
import { SignUpComponent } from './log-in/components/sign-up/sign-up.component';
import { SignUpSucceedMessagePageComponent } from './log-in/components/sign-up-succeed-message-page/sign-up-succeed-message-page.component';
import { PromoteUserComponent } from './log-in/components/promote-user/promote-user.component';
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
  { path:'', redirectTo:'login', pathMatch:'full' },
  { path:'login', component: SignInComponent },
  { path:'signup', component: SignUpComponent },
  { path:'signupsucceed', component: SignUpSucceedMessagePageComponent },
  { path:'accountpromote', component: PromoteUserComponent, canActivate:[AuthGuard] },
  { path:'dashboard', component:DashboardComponent, canActivate:[AuthGuard] },
  { path:'itemdetail/:id', component:ItemDetailComponent, canActivate:[AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
