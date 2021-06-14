import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DrivesSearchPageRoutingModule } from './drives-search-routing.module';

import { DrivesSearchPage } from './drives-search.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DrivesSearchPageRoutingModule
  ],
  declarations: [DrivesSearchPage]
})
export class DrivesSearchPageModule {}
