import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PlacesSearchModalComponent } from './places-search-modal/places-search-modal.component';
import { PersonalInfoModalComponent } from './personal-info-modal/personal-info-modal.component';
import { VehicleFormModalComponent } from './vehicle-form-modal/vehicle-form-modal.component';
import { RideSearchFormComponent } from './ride-search-form/ride-search-form.component';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    PlacesSearchModalComponent,
    PersonalInfoModalComponent,
    VehicleFormModalComponent,
    RideSearchFormComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    IonicModule.forRoot(),
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAkhb5VWwXrBNr9W8cmWdMufQfNdEQYlgc',
    }),
    AgmDirectionModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    RideSearchFormComponent,
    AgmCoreModule,
    AgmDirectionModule,
  ],
})
export class PartialsModule {}
