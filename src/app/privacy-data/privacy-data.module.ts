import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrivacyDataPageRoutingModule } from './privacy-data-routing.module';

import { PrivacyDataPage } from './privacy-data.page';
import { PartialsModule } from '../partials/partials.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrivacyDataPageRoutingModule,
    PartialsModule,
  ],
  declarations: [PrivacyDataPage],
})
export class PrivacyDataPageModule {}
