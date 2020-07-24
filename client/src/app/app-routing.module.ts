import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemDetailComponent } from './dashboard/components/item-detail/item-detail.component';
import { DashboardComponent } from './dashboard/components/dashboard/dashboard.component';
import { SignInComponent } from './log-in/components/sign-in/sign-in.component';
import { PromoteUserComponent } from './log-in/components/promote-user/promote-user.component';
import { AuthGuard } from './auth/auth.guard';
import { SignUpSucceedMessagePageComponent } from './log-in/components/sign-up/sign-up-succeed-message-page/sign-up-succeed-message-page.component';
import { SignUpComponent } from './log-in/components/sign-up/sign-up/sign-up.component';
import { PasswordResetEmailSentComponent } from './log-in/components/reset-password/password-reset-email-sent/password-reset-email-sent.component';
import { ResetPasswordSucceedComponent } from './log-in/components/reset-password/reset-password-succeed/reset-password-succeed.component';
import { BeginPasswordResetComponent } from './log-in/components/reset-password/begin-password-reset/begin-password-reset.component';
import { ResetPasswordComponent } from './log-in/components/reset-password/reset-password/reset-password.component';
import { FilteredItemComponent } from './dashboard/components/filtered-item/filtered-item.component';


const routes: Routes = [
  // wild card
  { path:'', redirectTo:'login', pathMatch:'full' },
  
  // log in
  { path:'login', component: SignInComponent },
  
  // sign up
  { path:'signup', component: SignUpComponent },
  { path:'signupsucceed', component: SignUpSucceedMessagePageComponent },

  // reset password
  { path:'begin_password_reset', component: BeginPasswordResetComponent},
  { path:'reset_email_sent', component: PasswordResetEmailSentComponent},
  { path:'reset_password/:resetPwdToken', component: ResetPasswordComponent},
  { path:'password_reset_succeed', component: ResetPasswordSucceedComponent},

  // set user as administrator
  { path:'accountpromote', component: PromoteUserComponent, canActivate:[AuthGuard] },

  // upcomming sprint review dashboard
  { path:'dashboard', component:DashboardComponent, canActivate:[AuthGuard] },

  // sprint detail board
  { path:'itemdetail/:id', component:ItemDetailComponent, canActivate:[AuthGuard] },

  // filtered sprint review board
  { path:'itemfilter', component: FilteredItemComponent, canActivate:[AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
