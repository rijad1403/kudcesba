import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { RidesPageRoutingModule } from './rides-routing.module';
import { RidesPage } from './rides.page';
import { PartialsModule } from '../../../partials/partials.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RidesPageRoutingModule,
    PartialsModule,
  ],
  declarations: [RidesPage],
  exports: [PartialsModule],
})
export class RidesPageModule {}
