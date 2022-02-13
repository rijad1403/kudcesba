import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewRideHelpPage } from './new-ride-help.page';

const routes: Routes = [
  {
    path: '',
    component: NewRideHelpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewRideHelpPageRoutingModule {}
