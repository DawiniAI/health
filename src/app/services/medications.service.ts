import { Diff, diff_match_patch } from 'diff-match-patch';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Storage, getDownloadURL, ref } from '@angular/fire/storage';
import { BehaviorSubject, Observable } from 'rxjs';
import { StorageService } from './storage.service';
import { APIVersionResponse } from '../models/app';
import { Medication, SearchableKeys } from '../models/medication';

@Injectable({
  providedIn: 'root',
})
export class MedicationsService {
  private firebaseStorage: Storage = inject(Storage);
  private storageService: StorageService = inject(StorageService);
  public medications: Medication[] = [];
  public medications$: BehaviorSubject<Medication[]> = new BehaviorSubject(
    this.medications
  );
  dmp;

  constructor(private http: HttpClient) {
    this.dmp = new diff_match_patch();
  }

  checkForDrugDrugInteractions(medications: Medication[]) {
    if (medications.length < 2) {
      return new Observable((observer) => {
        observer.next(false);
      });
    }
    const activeIngredients = medications.map(
      (medication) => medication.activeingredient
    );
    console.log('active ingredients', activeIngredients);
    const activeIngredientsList = [];
    for (let activeIngredient of activeIngredients) {
      const activeIngredientList = activeIngredient.split('+');
      activeIngredientsList.push(...activeIngredientList);
    }
    console.log('active ingredients list', activeIngredientsList);
    return this.http.post(
      'https://ti4mrupsaj6t422s4tw7nhfaby0gkdoy.lambda-url.us-west-1.on.aws/drug-interactions',
      {
        drugs: activeIngredientsList,
      }
    );
  }

  getMedicationDetailsById(id: string) {
    return this.medications.find((medication) => medication.id === id);
  }

  getAlternativeMedications(medication: Medication) {
    return this.medications.filter(
      (med) =>
        med.activeingredient === medication.activeingredient &&
        med.id !== medication.id
    );
  }

  getSimilarMedications(medication: Medication) {
    return this.medications.filter(
      (med) => med.group === medication.group && med.id !== medication.id
    );
  }

  async getCurrentAPIVersion() {
    const storageRef = ref(this.firebaseStorage, 'current-api-version.json');
    const apiURL = await getDownloadURL(storageRef);
    return this.http.get<APIVersionResponse>(apiURL).toPromise();
  }

  async getMedicationsFromFirebase() {
    const versionResponse = await this.getCurrentAPIVersion();
    if (!versionResponse) {
      //early return
      return [];
    }
    const version = versionResponse.data.version;
    const storageRef = ref(this.firebaseStorage, `${version}/medications.json`);
    const apiURL = await getDownloadURL(storageRef);
    this.medications =
      (await this.http.get<Medication[]>(apiURL).toPromise()) || [];
    this.medications$.next(this.medications);
    return this.medications;
  }

  async saveMedicationsToLocalStorage(medications: Medication[]) {
    if (!medications) {
      return [];
    }
    await this.storageService.set('medications', this.medications);
    return this.medications;
  }

  async getMedications() {
    if (this.medications$.getValue()?.length > 0) {
      console.log('got medications from behavior subject');
      return this.medications$.getValue();
    } else {
      const res = await this.storageService.get('medications');
      if (res) {
        this.medications = res;
        this.medications$.next(this.medications);
        console.log('got medications from local storage');
        return this.medications;
      } else {
        return await this.getMedicationsFromFirebaseAndSaveToLocalStorage();
      }
    }
  }

  async getMedicationsFromFirebaseAndSaveToLocalStorage() {
    this.medications = await this.getMedicationsFromFirebase();
    console.log('got medications from firebase');
    if (this.medications?.length > 0) {
      this.medications$.next(this.medications);
      await this.saveMedicationsToLocalStorage(this.medications);
      console.log('saved medications to local storage');
      return;
    } else {
      console.log(
        "couldn't get medications form firebase and didn't save to local storage"
      );
      return [];
    }
  }

  async searchMedications(
    searchTerm: string,
    filter: SearchableKeys = 'tradename'
  ) {
    const medications = (await this.getMedications()) ?? [];
    if (medications?.length > 0) {
      return medications
        .filter((medication: Medication) => {
          return medication[filter]
            .toString()
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        })
        .sort((a: Medication, b: Medication) => {
          if (a.tradename.toLowerCase().startsWith(searchTerm.toLowerCase())) {
            return -1;
          } else {
            return 1;
          }
        });
    } else {
      return [];
    }
  }

  getClosestMedications(
    term: string,
    threshold: number = 0.3,
    distance: number = 14
  ) {
    // Exit early if term is not provided.
    if (!term || term.trim() === '') return [];

    const matcher = this.dmp;
    matcher.Match_Threshold = threshold;
    matcher.Match_Distance = distance;

    const medications = this.medications$.getValue();

    // Calculate the difference score for each medication.
    const getDiffScore = (medicationName: string) => {
      const diffs = matcher.diff_main(medicationName, term);
      return diffs.reduce(
        (acc: any, [op]: any) => (op !== 0 ? acc + 1 : acc),
        0
      );
    };

    // Factor in the starting character in the score.
    const computeScore = (medication: any) => {
      const baseScore = getDiffScore(medication.tradename.toLowerCase());
      if (
        medication.tradename
          .toLowerCase()
          .startsWith(term.charAt(0).toLowerCase())
      ) {
        return baseScore - 0.5; // Give a slight advantage.
      }
      return baseScore;
    };

    // Filter and sort medications based on the computed score.
    const sortedMedications = medications
      .filter(
        (medication) =>
          matcher.match_main(medication.tradename.toLowerCase(), term, 0) > -1
      )
      .sort((a, b) => computeScore(a) - computeScore(b));

    console.log('sorted medications', sortedMedications);
    return sortedMedications;
  }

  async getMedicationPicture(medication: Medication) {
    const versionResponse = await this.getCurrentAPIVersion();
    if (!versionResponse) {
      //early return
      return [];
    }
    const version = versionResponse.data.version;
    const storageRef = ref(
      this.firebaseStorage,
      `pictures/${medication.id}.jpg`
    );
    const pictureURL = await getDownloadURL(storageRef);
    return pictureURL;
  }
}
