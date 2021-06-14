import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { HeaderComponent } from './partials/header/header.component';
import { FooterComponent } from './partials/footer/footer.component';

@NgModule({
  declarations: [FooterComponent, HeaderComponent],
  imports: [CommonModule, RouterModule, IonicModule.forRoot()],
  exports: [HeaderComponent, FooterComponent],
})
export class SharedModule {}
