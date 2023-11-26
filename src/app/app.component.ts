import { Component, OnInit, inject } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { StorageService } from './services/storage.service';
import { MedicationsService } from './services/medications.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit {
  storage = inject(StorageService);
  medicationsService = inject(MedicationsService);
  constructor() {}

  async ngOnInit() {
    //prepare storage
    await this.storage.init();
    //prepare current data
    await this.medicationsService.getMedications();
    //prepare latest data
    await this.prepareLatestData();
  }

  async prepareLatestData() {
    const remoteVersion = await this.medicationsService.getCurrentAPIVersion();
    const localVersion =
      (await this.storage.get('current-api-version')) || 'v5';
    const remoteVersionNumber = remoteVersion?.data?.version?.split('v')[1];
    const localVersionNumber = localVersion?.data?.version?.split('v')[1];
    console.log('remoteVersionNumber', remoteVersionNumber);
    console.log('localVersionNumber', localVersionNumber);
    if (
      remoteVersionNumber &&
      localVersionNumber &&
      remoteVersionNumber > localVersionNumber
    ) {
      await this.medicationsService.getMedicationsFromFirebaseAndSaveToLocalStorage();
      console.log('updated');
    } else {
      console.log('no need to update');
      //prepare data;
      this.medicationsService.getMedications();
    }
    this.storage.set('current-api-version', remoteVersion);
  }
}
