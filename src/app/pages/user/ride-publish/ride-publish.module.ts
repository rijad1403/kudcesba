import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RidePublishPageRoutingModule } from './ride-publish-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PartialsModule } from '../../../partials/partials.module';

import { RidePublishPage } from './ride-publish.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RidePublishPageRoutingModule,
    PartialsModule,
    ReactiveFormsModule,
  ],
  declarations: [RidePublishPage],
})
export class RidePublishPageModule {}
