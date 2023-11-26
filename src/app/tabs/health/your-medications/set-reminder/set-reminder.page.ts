import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-set-reminder',
  templateUrl: './set-reminder.page.html',
  styleUrls: ['./set-reminder.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class SetReminderPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
