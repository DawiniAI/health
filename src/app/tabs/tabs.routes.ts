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
            children: [
              {
                path: '',
                loadComponent: () =>
                  import(
                    './health/your-medications/your-medications.page'
                  ).then((m) => m.YourMedicationsPage),
              },
              {
                path: 'log',
                loadComponent: () =>
                  import(
                    './health/your-medications/log-medications/log-medications.page'
                  ).then((m) => m.LogMedicationsPage),
              },
              {
                path: 'reminder',
                loadComponent: () =>
                  import(
                    './health/your-medications/set-reminder/set-reminder.page'
                  ).then((m) => m.SetReminderPage),
              },
              {
                path: 'interactions',
                loadComponent: () =>
                  import(
                    './health/your-medications/drug-drug-interactions/drug-drug-interactions.page'
                  ).then((m) => m.DrugDrugInteractionsPage),
              },
              {
                path: 'refill',
                loadComponent: () =>
                  import(
                    './health/your-medications/auto-refill/auto-refill.page'
                  ).then((m) => m.AutoRefillPage),
              },
            ],
          },
        ],
      },
      {
        path: 'chat',
        loadComponent: () => import('./chat/chat.page').then((m) => m.ChatPage),
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
