import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  Auth,
  GoogleAuthProvider,
  User,
  signInAnonymously,
  signInWithCredential,
} from '@angular/fire/auth';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { StorageService } from './storage.service';

interface FakeUser {
  displayName: string;
  email: string;
  photoURL: string;
  uid: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: User | FakeUser | null = null;
  user$: BehaviorSubject<User | FakeUser | null> = new BehaviorSubject<
    User | FakeUser | null
  >(null);
  userDetails: User | FakeUser | null = null;
  userDetails$: BehaviorSubject<User | FakeUser | null> = new BehaviorSubject<
    User | FakeUser | null
  >(null);

  constructor(private auth: Auth, private storage: StorageService) {
    //Firebase Auth
    this.auth.onAuthStateChanged((user) => {
      console.log('firebase auth state changed', user);
      this.user$.next(user);
    });
  }

  fakeSignIn() {
    this.user = {
      displayName: 'Guest',
      email: '',
      photoURL: '',
      uid: 'guest',
    };
    this.user$.next(this.user);
    this.saveUserDataToStorage(this.user);
    return this.user;
  }

  async signinWithGoogle() {
    GoogleAuth.initialize({
      clientId:
        '940533599463-u18fmt6ltd38auaahoiv5r8ljt2tv3cr.apps.googleusercontent.com',
      scopes: ['profile', 'email'],
      grantOfflineAccess: true,
    });
    const googleUser = await GoogleAuth.signIn();
    if (googleUser) {
      const credential = GoogleAuthProvider.credential(
        googleUser.authentication.idToken
      );
      const userCredential = await signInWithCredential(this.auth, credential);
      this.user = userCredential.user;
      this.user$.next(this.user);
      await this.saveUserDataToStorage(this.user);
      return userCredential.user;
    } else {
      return null;
    }
  }

  async signInAnonymously() {
    return signInAnonymously(this.auth);
  }

  async saveUserDataToStorage(user: User | FakeUser) {
    const neededUserData = {
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      uid: user.uid,
    };
    await this.storage.set('user', neededUserData);
    console.log('saved user to storage');
  }
}
