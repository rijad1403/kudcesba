import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RidePublishPage } from './ride-publish.page';

const routes: Routes = [
  {
    path: '',
    component: RidePublishPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RidePublishPageRoutingModule {}
