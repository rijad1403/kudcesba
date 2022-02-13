import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DataValidationPageRoutingModule } from './data-validation-routing.module';

import { DataValidationPage } from './data-validation.page';
import { PartialsModule } from '../partials/partials.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DataValidationPageRoutingModule,
    PartialsModule,
  ],
  declarations: [DataValidationPage],
})
export class DataValidationPageModule {}
