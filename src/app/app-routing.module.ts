import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth-guard';
import { LogoutGuard } from './shared/guards/logout.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
    canActivate: [LogoutGuard],
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./pages/register/register.module').then(
        (m) => m.RegisterPageModule
      ),
    canActivate: [LogoutGuard],
  },
  {
    path: 'ride-search',
    loadChildren: () =>
      import('./pages/ride-search/ride-search.module').then(
        (m) => m.DrivesSearchPageModule
      ),
  },
  {
    path: 'ride-info/:rideId',
    loadChildren: () =>
      import('./pages/ride-info/ride-info.module').then(
        (m) => m.RideInfoPageModule
      ),
  },
  {
    path: 'user-info/:userId',
    loadChildren: () =>
      import('./pages/user-info/user-info.module').then(
        (m) => m.UserPageModule
      ),
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./pages/user/user.module').then((m) => m.UserModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'about',
    loadChildren: () =>
      import('./about/about.module').then((m) => m.AboutPageModule),
  },
  {
    path: 'faq',
    loadChildren: () => import('./faq/faq.module').then((m) => m.FaqPageModule),
  },
  {
    path: 'contact',
    loadChildren: () =>
      import('./contact/contact.module').then((m) => m.ContactPageModule),
  },
  {
    path: 'privacy-data',
    loadChildren: () =>
      import('./privacy-data/privacy-data.module').then(
        (m) => m.PrivacyDataPageModule
      ),
  },  {
    path: 'data-validation',
    loadChildren: () => import('./data-validation/data-validation.module').then( m => m.DataValidationPageModule)
  },
  {
    path: 'new-ride-help',
    loadChildren: () => import('./new-ride-help/new-ride-help.module').then( m => m.NewRideHelpPageModule)
  },
  {
    path: 'find-ride-help',
    loadChildren: () => import('./find-ride-help/find-ride-help.module').then( m => m.FindRideHelpPageModule)
  },
  {
    path: 'blog',
    loadChildren: () => import('./blog/blog.module').then( m => m.BlogPageModule)
  },


  // {
  //   path: '**',
  //   redirectTo: '/home',
  //   pathMatch: 'full',
  // },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
