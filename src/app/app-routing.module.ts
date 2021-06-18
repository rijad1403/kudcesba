import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./register/register.module').then((m) => m.RegisterPageModule),
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
    path: 'user/:userId',
    loadChildren: () =>
      import('./user/user.module').then((m) => m.UserPageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
