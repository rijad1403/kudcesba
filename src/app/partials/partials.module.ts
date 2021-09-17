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

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    PlacesSearchModalComponent,
    PersonalInfoModalComponent,
    VehicleFormModalComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    IonicModule.forRoot(),
    FormsModule,
  ],
  exports: [HeaderComponent, FooterComponent],
})
export class PartialsModule {}
