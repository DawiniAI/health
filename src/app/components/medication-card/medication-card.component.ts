import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
  inject,
} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ImagePreloader } from 'src/app/directives/image-preloader.directive';
import { Medication } from 'src/app/models/medication';
import { MedicationsService } from 'src/app/services/medications.service';
export interface MedicationWithPicture extends Medication {
  picture?: string;
}
@Component({
  selector: 'app-medication-card',
  templateUrl: './medication-card.component.html',
  styleUrls: ['./medication-card.component.scss'],
  imports: [IonicModule, CommonModule, ImagePreloader],
  standalone: true,
})
export class MedicationCardComponent {
  @Input() medication: MedicationWithPicture = {} as MedicationWithPicture;
  gotMedicationPicturesCache: { [key: string]: string } = {};
  medicationsService = inject(MedicationsService);
  @Output() medicationClicked = new EventEmitter<MedicationWithPicture>();
  @Input() shouldShowAdd = false;
  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    const medicationInput: Medication = changes['medication'].currentValue;
    if (medicationInput) {
      this.getMedicationPicture(medicationInput);
    }
  }

  async getMedicationPicture(medication: Medication) {
    if (this.gotMedicationPicturesCache[medication.id]) {
      this.medication.picture = this.gotMedicationPicturesCache[medication.id];
      return this.medication.picture;
    }
    const medicationPictureURL =
      await this.medicationsService.getMedicationPicture(medication);
    if (typeof medicationPictureURL === 'string') {
      this.medication.picture = medicationPictureURL;
    } else {
      this.medication.picture = '';
    }
    this.gotMedicationPicturesCache[medication.id] = this.medication.picture;
    return this.medication.picture;
  }

  setDefaultPicture() {
    this.medication.picture = 'assets/img/medication-placeholder.webp';
  }


  medicationClick(medication: MedicationWithPicture) {
    this.medicationClicked.emit(medication);
  }
}
