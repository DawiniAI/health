import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    // If using, define drivers here: await this._storage?.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async set(key: string, value: any) {
    await this._storage?.set(key, value);
  }

  async get(key: string) {
    return await this._storage?.get(key);
  }

  async remove(key: string) {
    await this._storage?.remove(key);
  }

  async clear() {
    await this._storage?.clear();
  }

  async keys() {
    return await this._storage?.keys();
  }

  async length() {
    return await this._storage?.length();
  }

  async forEach(
    callback: (value: any, key: string, iterationNumber: Number) => void
  ) {
    await this._storage?.forEach(callback);
  }

  async create() {
    await this._storage?.create();
  }
}
