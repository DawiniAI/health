import { MedicationWithPicture } from './../../../../components/medication-card/medication-card.component';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController, IonicModule, ModalController } from '@ionic/angular';
import { MedicationCardComponent } from 'src/app/components/medication-card/medication-card.component';
import { RouterModule } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { addIcons } from 'ionicons';
import {
  add,
  searchOutline,
  optionsOutline,
  bandage,
  chevronForward,
  cameraOutline,
  alarm,
  colorFilter,
  flash,
} from 'ionicons/icons';
import { Medication } from 'src/app/models/medication';
import { MedicationsService } from 'src/app/services/medications.service';
import { toEnglishName } from 'src/app/utlities/toEn';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-log-medications',
  templateUrl: './log-medications.page.html',
  styleUrls: ['./log-medications.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    MedicationCardComponent,
    NgFor,
    RouterModule,
  ],
})
export class LogMedicationsPage implements OnInit {
  searchTerm: string = '';
  searchTerm$ = new Subject<string>();
  searchResults: Medication[] = [];
  aiResults: any;
  suggestedTerm: any;
  medicationService = inject(MedicationsService);
  storage = inject(StorageService);
  showAdd = false;
  myMedications: MedicationWithPicture[] = [];
  alertController = inject(AlertController);
  modalController = inject(ModalController);
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
      flash,
    });
  }
  async ngOnInit() {
    this.myMedications = (await this.storage.get('my-medications')) || [];

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

  async onMedicationClicked(medication: MedicationWithPicture) {
    //add medication to storage with key my-medications
    let myMedications = await this.storage.get('my-medications');
    if (!myMedications) {
      myMedications = [];
    }
    //don't add if already exists
    if (
      myMedications.find((m: MedicationWithPicture) => m.id === medication.id)
    ) {
      this.searchResults = [];
      this.myMedications = await this.storage.get('my-medications');
      this.showAdd = false;
      return;
    }
    myMedications.push(medication);
    await this.storage.set('my-medications', myMedications);
    console.log('myMedications', myMedications);
    this.searchResults = [];
    this.myMedications = await this.storage.get('my-medications');
    this.showAdd = false;
    //check for drug drug interactions

    this.medicationService
      .checkForDrugDrugInteractions(myMedications)
      .subscribe((res: any) => {
        if (res.drug_interactions) {
          //drug_interactions
          this.alertController
            .create({
              header: 'Drug Drug Interactions',
              message: res.explanation,
              buttons: ['OK'],
            })
            .then((alert) => {
              alert.present();
            });
        }
      });
  }
}
