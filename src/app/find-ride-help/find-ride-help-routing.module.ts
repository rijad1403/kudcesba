import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FindRideHelpPage } from './find-ride-help.page';

const routes: Routes = [
  {
    path: '',
    component: FindRideHelpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FindRideHelpPageRoutingModule {}
