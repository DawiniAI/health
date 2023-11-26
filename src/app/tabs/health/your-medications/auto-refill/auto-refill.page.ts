import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-auto-refill',
  templateUrl: './auto-refill.page.html',
  styleUrls: ['./auto-refill.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AutoRefillPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
