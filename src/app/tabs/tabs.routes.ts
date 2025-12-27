import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    // When loaded under app route 'tabs', keep this empty so final
    // URLs are '/tabs/tab1', '/tabs/tab2', etc.
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadComponent: () =>
          import('../tab1/tab1.page').then((m) => m.Tab1Page),
      },
      {
        path: 'tab2',
        loadComponent: () =>
          import('../tab2/tab2.page').then((m) => m.Tab2Page),
      },
      {
        path: 'tab3',
        loadComponent: () =>
          import('../tab3/tab3.page').then((m) => m.Tab3Page),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('../profile/profile.page').then((m) => m.ProfilePage),
      },
      {
        path: 'profile/basic-info',
        loadComponent: () =>
          import('../profile/basic-info.page').then((m) => m.BasicInfoPage),
      },
      {
        path: 'profile/about',
        loadComponent: () =>
          import('../profile/about.page').then((m) => m.AboutPage),
      },
      {
        path: 'profile/religious',
        loadComponent: () =>
          import('../profile/religious.page').then((m) => m.ReligiousPage),
      },
      {
        path: 'profile/education',
        loadComponent: () =>
          import('../profile/education.page').then((m) => m.EducationPage),
      },
      {
        path: 'profile/family',
        loadComponent: () =>
          import('../profile/family.page').then((m) => m.FamilyPage),
      },
      {
        path: 'profile/location',
        loadComponent: () =>
          import('../profile/location.page').then((m) => m.LocationPage),
      },
      {
        path: 'profile/partner-preferences',
        loadComponent: () =>
          import('../profile/partner-preferences.page').then((m) => m.PartnerPreferencesPage),
      },
      {
        path: '',
        redirectTo: 'tab1',
        pathMatch: 'full',
      },
    ],
  },
];
