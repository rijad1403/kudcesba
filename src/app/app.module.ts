import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PartialsModule } from './partials/partials.module';
import { EnvironmentconfigService } from './shared/services/environmentconfig.service';
import { HttpClientModule } from '@angular/common/http';

const appInitializerFunction = (envConfigService: EnvironmentconfigService) => {
  return () => {
    return envConfigService.load();
  };
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    PartialsModule,
    HttpClientModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFunction,
      deps: [EnvironmentconfigService],
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
