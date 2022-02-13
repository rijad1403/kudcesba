import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrivacyDataPage } from './privacy-data.page';

const routes: Routes = [
  {
    path: '',
    component: PrivacyDataPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivacyDataPageRoutingModule {}
