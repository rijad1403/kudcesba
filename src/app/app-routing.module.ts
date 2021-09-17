import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth-guard';
import { LogoutGuard } from './shared/guards/logout.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'login',
    redirectTo: 'login/email',
    pathMatch: 'full',
    // loadChildren: () =>
    //   import('./login/login.module').then((m) => m.LoginPageModule),
    // canActivate: [LogoutGuard],
    // canActivateChild: [LogoutGuard],
  },
  {
    path: 'login/email',
    loadChildren: () =>
      import('./login/email/email.module').then((m) => m.EmailPageModule),
    canActivate: [LogoutGuard],
    canActivateChild: [LogoutGuard],
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./register/register.module').then((m) => m.RegisterPageModule),
    canActivate: [LogoutGuard],
    canActivateChild: [LogoutGuard],
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'ride-search',
    loadChildren: () =>
      import('./ride-search/ride-search.module').then(
        (m) => m.DrivesSearchPageModule
      ),
  },
  {
    path: 'ride-share/:start/:destination',
    loadChildren: () =>
      import('./ride-share/ride-share.module').then(
        (m) => m.DrivesSharePageModule
      ),
  },
  {
    path: 'ride-info/:rideId/:start/:destination',
    loadChildren: () =>
      import('./ride-info/ride-info.module').then((m) => m.RideInfoPageModule),
  },
  {
    path: 'user-info/:userId',
    loadChildren: () =>
      import('./user-info/user-info.module').then((m) => m.UserPageModule),
  },
  {
    path: 'ride-publish',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./ride-publish/ride-publish.module').then(
        (m) => m.RidePublishPageModule
      ),
  },
  {
    path: 'personal-info',
    loadChildren: () =>
      import('./personal-info/personal-info.module').then(
        (m) => m.PersonalInfoPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'password-change',
    loadChildren: () =>
      import('./password-change/password-change.module').then(
        (m) => m.PasswordChangePageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'password-reset',
    loadChildren: () =>
      import('./password-reset/password-reset.module').then(
        (m) => m.PasswordResetPageModule
      ),
    canActivate: [LogoutGuard],
  },
  {
    path: '*',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'my-profile',
    loadChildren: () =>
      import('./my-profile/my-profile.module').then(
        (m) => m.MyProfilePageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'vehicles',
    loadChildren: () =>
      import('./vehicles/vehicles.module').then((m) => m.VehiclesPageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
