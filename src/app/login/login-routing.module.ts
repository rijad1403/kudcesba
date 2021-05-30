import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPage } from './login.page';

const routes: Routes = [
  {
    path: '',
    component: LoginPage
  },  {
    path: 'email',
    loadChildren: () => import('./email/email.module').then( m => m.EmailPageModule)
  },
  {
    path: 'name',
    loadChildren: () => import('./name/name.module').then( m => m.NamePageModule)
  },
  {
    path: 'password-forgot',
    loadChildren: () => import('./password-forgot/password-forgot.module').then( m => m.PasswordForgotPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPageRoutingModule {}
