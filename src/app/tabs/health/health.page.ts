import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  bed,
  bulb,
  chevronForward,
  flame,
  heart,
  medkit,
  thermometer,
  water,
  chatbubble,
  storefrontOutline,
  storefront,
  medical,
  bandage,
} from 'ionicons/icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-health',
  templateUrl: './health.page.html',
  styleUrls: ['./health.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class HealthPage  {
  constructor(private router: Router) {
    addIcons({
      bed,
      bulb,
      heart,
      flame,
      medkit,
      thermometer,
      water,
      chevronForward,
      chatbubble,
      storefront,
      medical,
      bandage
    });
  }


  startChatWithVirtualDoctor() {
    this.router.navigate(['tabs/chat']);
  }
  goToOrderMedicationsPage(){
    this.router.navigate(["tabs/store"])
  }
  goToYourMedicationsPage(){
    this.router.navigate(["tabs/health/medications"])
  }
}
