import { NgFor } from '@angular/common';
import {
  Component,
  EnvironmentInjector,
  ViewChild,
  inject,
} from '@angular/core';
import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  triangle,
  ellipse,
  square,
  heart,
  shareSocialOutline,
  appsOutline,
  storefrontOutline,
  peopleOutline,
  chatbubblesOutline,
  heartOutline,
  chatbubbles,
  apps,
  storefront,
} from 'ionicons/icons';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: true,
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, NgFor],
})
export class TabsPage {
  tabs = [
    { path: 'tabs/health', icon: 'heart', label: 'Health', name: 'health' },
    {
      path: 'tabs/chat',
      icon: 'chatbubbles',
      label: 'Chat',
      name: 'chat',
    },
    {
      path: 'tabs/browse',
      icon: 'apps',
      label: 'Browse',
      name: 'browse',
    },
    {
      path: 'tabs/store',
      icon: 'storefront',
      label: 'Store',
      name: 'store',
    },
  ];
  public environmentInjector = inject(EnvironmentInjector);
  selectedTab: any;
  @ViewChild('ionTabs', { static: false }) ionicTabs!: IonTabs;

  constructor() {
    addIcons({
      heart,
      heartOutline,
      chatbubbles,
      chatbubblesOutline,
      apps,
      appsOutline,
      storefront,
      storefrontOutline,
    });
  }
  setCurrentTab() {
    this.selectedTab = this.ionicTabs?.getSelected();
    console.log('selectedTab', this.selectedTab);
    if (this.selectedTab === 'chat') {
      const tabBar: HTMLElement = document.querySelector(
        'ion-tab-bar'
      ) as HTMLElement;
      const tabBarExtension: HTMLElement = document.querySelector(
        '.extension'
      ) as HTMLElement;
      if(tabBarExtension){

        tabBar.style.display = 'none';
        tabBarExtension.style.display = 'none';
      }
    } else {
      const tabBar: HTMLElement = document.querySelector(
        'ion-tab-bar'
      ) as HTMLElement;
      const tabBarExtension: HTMLElement = document.querySelector(
        '.extension'
      ) as HTMLElement;
      if(tabBarExtension){

        tabBar.style.display = 'flex';
        tabBarExtension.style.display = 'flex';
      }
    }
  }
}
