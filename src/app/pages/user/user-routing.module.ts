import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'profile',
  },
  {
    path: 'vehicles',
    loadChildren: () =>
      import('./vehicles/vehicles.module').then((m) => m.VehiclesPageModule),
  },
  {
    path: 'personal-info',
    loadChildren: () =>
      import('./personal-info/personal-info.module').then(
        (m) => m.PersonalInfoPageModule
      ),
  },
  {
    path: 'password-change',
    loadChildren: () =>
      import('./password-change/password-change.module').then(
        (m) => m.PasswordChangePageModule
      ),
  },
  {
    path: 'vehicles',
    loadChildren: () =>
      import('./vehicles/vehicles.module').then((m) => m.VehiclesPageModule),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./profile/profile.module').then((m) => m.ProfilePageModule),
  },
  {
    path: 'rides',
    loadChildren: () =>
      import('./rides/rides.module').then((m) => m.RidesPageModule),
  },
  {
    path: 'ride-publish',
    loadChildren: () =>
      import('./ride-publish/ride-publish.module').then(
        (m) => m.RidePublishPageModule
      ),
  },
  {
    path: 'ride-requests',
    loadChildren: () =>
      import('./ride-requests/ride-requests.module').then(
        (m) => m.RideRequestsPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
