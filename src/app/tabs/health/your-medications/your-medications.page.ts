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

@Component({
  selector: 'app-your-medications',
  templateUrl: './your-medications.page.html',
  styleUrls: ['./your-medications.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,MedicationCardComponent,NgFor]
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

  ngOnInit() {
    this.initSearch();
  }

  onSearchInput(event: Event) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.searchTerm$.next(this.searchTerm);
  }

  initSearch() {
    this.searchTerm$.subscribe(async (searchTerm) => {
      if (searchTerm && searchTerm.length > 3) {
        if (this.searchTerm.match(/^[\u0621-\u064A]+/)) {
          //Arabic Search Term
          let arabicSearchTermConvertedToEnglish = toEnglishName(
            this.searchTerm
          );
          console.log(
            'arabicSearchTermConvertedToEnglish',
            arabicSearchTermConvertedToEnglish
          );
          this.searchResults = await this.medicationService.searchMedications(
            arabicSearchTermConvertedToEnglish
          );
          if (this.searchResults.length === 0) {
            this.aiResults = await this.medicationService.getClosestMedications(
              arabicSearchTermConvertedToEnglish,
              0.35,
              15
            );
            if (this.aiResults.length > 0) {
              this.suggestedTerm = this.aiResults[0].tradename;
            }
          }
        } else {
          //Normal English Search Term
          this.searchResults = await this.medicationService.searchMedications(
            searchTerm
          );
          if (this.searchResults.length === 0) {
            this.aiResults = await this.medicationService.getClosestMedications(
              searchTerm
            );
            if (this.aiResults.length > 0) {
              this.suggestedTerm = this.aiResults[0].tradename;
            }
          }
        }
      } else {
        this.searchResults = [];
      }
    });
  }

}
