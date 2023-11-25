import { importProvidersFrom, EnvironmentProviders } from '@angular/core';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { environment } from './environments/environment';


const firebaseProviders: EnvironmentProviders = importProvidersFrom([
  provideFirebaseApp(() =>
    initializeApp(
      environment.firebase
    )
  ),
  provideFirestore(() => getFirestore()),
  provideAuth(() => getAuth()),
  provideStorage(() => getStorage()),
]);

export { firebaseProviders };
