import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { CommonDrivesComponent } from '../common-drives/common-drives.component';
import { PartialsModule } from '../partials/partials.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    PartialsModule,
    ReactiveFormsModule,
  ],
  declarations: [HomePage, CommonDrivesComponent],
})
export class HomePageModule {}
