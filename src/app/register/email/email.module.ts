import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmailPageRoutingModule } from './email-routing.module';

import { EmailPage } from './email.page';

@NgModule({
  imports: [
    FormsModule,
    IonicModule,
    EmailPageRoutingModule
  ],
  declarations: [EmailPage]
})
export class EmailPageModule {}
