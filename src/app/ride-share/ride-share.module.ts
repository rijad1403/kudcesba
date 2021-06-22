import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RideSharePageRoutingModule } from './ride-share-routing.module';

import { RideSharePage } from './ride-share.page';
import { PartialsModule } from '../partials/partials.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RideSharePageRoutingModule,
    PartialsModule,
  ],
  declarations: [RideSharePage],
})
export class DrivesSharePageModule {}
