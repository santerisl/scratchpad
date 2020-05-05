import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {

  constructor() { }

  getItem(key: string): any {
    const data = window.localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  setItem(key: string, value: any): void {
    const data = value === undefined ? '' : JSON.stringify(value);
    window.localStorage.setItem(key, data);
  }
}
