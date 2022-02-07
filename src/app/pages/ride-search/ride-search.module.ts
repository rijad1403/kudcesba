import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PartialsModule } from '../../partials/partials.module';

import { IonicModule } from '@ionic/angular';

import { RideSearchPageRoutingModule } from './ride-search-routing.module';

import { RideSearchPage } from './ride-search.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RideSearchPageRoutingModule,
    PartialsModule,
  ],
  declarations: [RideSearchPage],
})
export class DrivesSearchPageModule {}
