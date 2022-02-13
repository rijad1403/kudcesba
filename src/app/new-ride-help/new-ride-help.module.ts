import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewRideHelpPageRoutingModule } from './new-ride-help-routing.module';

import { NewRideHelpPage } from './new-ride-help.page';
import { PartialsModule } from '../partials/partials.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewRideHelpPageRoutingModule,
    PartialsModule,
  ],
  declarations: [NewRideHelpPage],
})
export class NewRideHelpPageModule {}
