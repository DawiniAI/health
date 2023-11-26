import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-drug-drug-interactions',
  templateUrl: './drug-drug-interactions.page.html',
  styleUrls: ['./drug-drug-interactions.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class DrugDrugInteractionsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
