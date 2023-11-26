import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { add, alarm, bandage, cameraOutline, chevronForward, colorFilter, flash, optionsOutline, searchOutline } from 'ionicons/icons';
import { Subject } from 'rxjs';
import { toEnglishName } from 'src/app/utlities/toEn';
import { MedicationsService } from 'src/app/services/medications.service';
import { Medication } from 'src/app/models/medication';
import { MedicationCardComponent } from 'src/app/components/medication-card/medication-card.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-your-medications',
  templateUrl: './your-medications.page.html',
  styleUrls: ['./your-medications.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,MedicationCardComponent,NgFor,RouterModule]
})
export class YourMedicationsPage implements OnInit {
  searchTerm: string = '';
  searchTerm$ = new Subject<string>();
  searchResults: Medication[] = [];
  aiResults: any;
  suggestedTerm: any;
  medicationService = inject(MedicationsService);
  constructor() {
    addIcons({
      add,
      searchOutline,
      optionsOutline,
      bandage,
      chevronForward,
      cameraOutline,
      alarm,
      colorFilter,
      flash
    })
  }

  ngOnInit(): void {

  }





}
