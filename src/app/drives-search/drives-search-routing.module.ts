import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DrivesSearchPage } from './drives-search.page';

const routes: Routes = [
  {
    path: '',
    component: DrivesSearchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DrivesSearchPageRoutingModule {}
