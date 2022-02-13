import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FindRideHelpPageRoutingModule } from './find-ride-help-routing.module';

import { FindRideHelpPage } from './find-ride-help.page';
import { PartialsModule } from '../partials/partials.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FindRideHelpPageRoutingModule,
    PartialsModule,
  ],
  declarations: [FindRideHelpPage],
})
export class FindRideHelpPageModule {}
