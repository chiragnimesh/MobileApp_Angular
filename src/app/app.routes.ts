import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'admin',
    loadComponent: () =>
      import('./pages/admin/admin.component').then((e) => e.AdminComponent),
  },
  {
    path: 'mobile',
    loadComponent: () =>
      import('./pages/mobile/mobile.component').then((e) => e.MobileComponent),
  },
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((e) => e.HomeComponent),
  },
  {
    path: 'mobilecard',
    loadComponent: () =>
      import('./pages/mobilecard/mobilecard.component').then(
        (e) => e.MobilecardComponent
      ),
  },
  {
    path: 'mobilecard',
    loadComponent: () =>
      import('./pages/mobilecard/mobilecard.component').then(
        (e) => e.MobilecardComponent
      ),
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./pages/about/about.component').then((e) => e.AboutComponent),
  },
  {
    path: 'test',
    loadComponent: () =>
      import('./pages/test/test.component').then((e) => e.TestComponent),
  },
  {
    path: 'carousel',
    loadComponent: () =>
      import('./pages/mobilecarousel/mobilecarousel.component').then(
        (e) => e.MobilecarouselComponent
      ),
  },
];
