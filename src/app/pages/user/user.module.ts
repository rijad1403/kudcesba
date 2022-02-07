import { NgModule } from '@angular/core';
import { PartialsModule } from '../../partials/partials.module';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  imports: [PartialsModule, UserRoutingModule],
})
export class UserModule {}
