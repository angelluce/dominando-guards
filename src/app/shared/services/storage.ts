import { Injectable } from '@angular/core';
import CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private secretKey = 'desarrollo';

  setItem(key: string, value: string) {
    const encryptedValue = CryptoJS.AES.encrypt(value, this.secretKey).toString();
    localStorage.setItem(key, encryptedValue);
  }

  getItem(key: string): string | null {
    const encryptedValue = localStorage.getItem(key);
    if (!encryptedValue) {
      return null;
    }
    return CryptoJS.AES.decrypt(encryptedValue, this.secretKey).toString(CryptoJS.enc.Utf8);
  }

  setItemJSON(key: string, value: any) {
    this.setItem(key, JSON.stringify(value));
  }

  getItemJSON(key: string): any {
    const value = this.getItem(key);
    return value ? JSON.parse(value) : null;
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
  }

  clear() {
    localStorage.clear();
  }
}
