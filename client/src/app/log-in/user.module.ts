import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up/sign-up.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PromoteUserComponent } from './components/promote-user/promote-user.component';
import { SignUpSucceedMessagePageComponent } from './components/sign-up/sign-up-succeed-message-page/sign-up-succeed-message-page.component';


@NgModule({
  declarations: [
    SignInComponent, 
    SignUpComponent, 
    SignUpSucceedMessagePageComponent, 
    PromoteUserComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: []
})
export class UserModule { }
