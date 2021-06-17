import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RideSearchPageRoutingModule } from './ride-search-routing.module';

import { RideSearchPage } from './ride-search.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RideSearchPageRoutingModule,
  ],
  declarations: [RideSearchPage],
})
export class DrivesSearchPageModule {}
