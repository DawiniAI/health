import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'health',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./health/health.page').then((m) => m.HealthPage),
          },
          {
            path: 'medications',
            loadComponent: () => import('./health/your-medications/your-medications.page').then( m => m.YourMedicationsPage)
          },
        ],
      },
      {
        path: 'chat',
        loadComponent: () =>
          import('./chat/chat.page').then((m) => m.ChatPage),
      },
      {
        path: 'browse',
        loadComponent: () =>
          import('./browse/browse.page').then((m) => m.BrowsePage),
      },
      {
        path: 'store',
        loadComponent: () =>
          import('./store/store.page').then((m) => m.StorePage),
      },
      {
        path: '',
        redirectTo: '/tabs/health',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/health',
    pathMatch: 'full',
  },

];
