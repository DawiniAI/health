import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
  inject,
} from '@angular/core';
import { Medication } from 'src/app/models/medication';
import { MedicationsService } from 'src/app/services/medications.service';
import { MedicationWithPicture } from '../medication-card/medication-card.component';
import { NgFor, NgOptimizedImage } from '@angular/common';
import { ImagePreloader } from 'src/app/directives/image-preloader.directive';
@Component({
  selector: 'app-medication-card-store',
  templateUrl: './medication-card-store.component.html',
  styleUrls: ['./medication-card-store.component.scss'],
  standalone: true,
  imports: [NgOptimizedImage, ImagePreloader, NgFor],
})
export class MedicationCardStoreComponent {
  @Input() medication: MedicationWithPicture = {} as MedicationWithPicture;
  gotMedicationPicturesCache: { [key: string]: string } = {};
  medicationsService = inject(MedicationsService);
  activeingredients: string[] = [];
  @Output() addToCartEvent = new EventEmitter<Medication>(); // Use the appropriate type instead of any

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    const medicationInput: Medication = changes['medication'].currentValue;
    if (medicationInput) {
      this.getMedicationPicture(medicationInput);
      this.activeingredients = this.medication.activeingredient.split('+');
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

  addToCart(medication: Medication) {
    console.log('added to cart');
    this.addToCartEvent.emit(medication);
  }
}
