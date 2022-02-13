import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DataValidationPage } from './data-validation.page';

const routes: Routes = [
  {
    path: '',
    component: DataValidationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DataValidationPageRoutingModule {}
