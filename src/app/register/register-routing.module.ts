import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterPage } from './register.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterPage
  },  {
    path: 'email',
    loadChildren: () => import('./email/email.module').then( m => m.EmailPageModule)
  },
  {
    path: 'name',
    loadChildren: () => import('./name/name.module').then( m => m.NamePageModule)
  },
  {
    path: 'birthdate',
    loadChildren: () => import('./birthdate/birthdate.module').then( m => m.BirthdatePageModule)
  },
  {
    path: 'gender',
    loadChildren: () => import('./gender/gender.module').then( m => m.GenderPageModule)
  },
  {
    path: 'password',
    loadChildren: () => import('./password/password.module').then( m => m.PasswordPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterPageRoutingModule {}
