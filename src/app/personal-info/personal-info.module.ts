import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PartialsModule } from '../partials/partials.module';

import { PersonalInfoPageRoutingModule } from './personal-info-routing.module';
import { PersonalInfoPage } from './personal-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PersonalInfoPageRoutingModule,
    PartialsModule,
  ],
  declarations: [PersonalInfoPage],
})
export class PersonalInfoPageModule {}
