import { Injectable } from '@angular/core';
import StorageService from '../StorageService';
import Scratchpad from '../Scratchpad';
import Item from '../Item';

@Injectable()
export class LocalStorageService implements StorageService {

  private lastId = 0;

  constructor() {}

  createScratchpad(name: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const id = this.createId();
      const sp: Scratchpad = {id, name, items: []};
      this.setItem(id, sp);
      resolve(id);
    });
  }

  loadScratchpad(id: string): Promise<Scratchpad> {
    return new Promise<Scratchpad>((resolve, reject) => {
      const sp: Scratchpad = this.getItem(id);
      if (sp) {
        resolve(sp);
      } else {
        reject('Not found');
      }
    });
  }

  removeScratchpad(id: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      window.localStorage.removeItem(id);
      resolve();
    });
  }

  addItem(id: string, content: string): Promise<Item> {
    return new Promise<Item>((resolve, reject) => {
      const sp: Scratchpad = this.getItem(id);
      let itemId = Math.max(...sp.items.map(i => i.id), 0) + 1;
      const item: Item = {
        id: itemId++,
        content,
        time: Date.now()
      };
      sp.items.unshift(item);

      this.setItem(id, sp);
      resolve(item);
    });
  }

  removeItem(id: string, itemId: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const sp: Scratchpad = this.getItem(id);
      sp.items = sp.items.filter(other => other.id !== itemId);
      this.setItem(id, sp);
      resolve();
    });

  }

  modifyItem(id: string, itemId: number, content: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const sp: Scratchpad = this.getItem(id);
      sp.items.map(item => {
        if (item.id === itemId) {
          item.content = content;
        }
      });
      this.setItem(id, sp);
      resolve();
    });
  }

  public getIds(): string[] {
    const ids: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const id = localStorage.key(i);
      if (id.startsWith('local:')) {
        ids.push(id);
      }
    }
    return ids;
  }

  private createId(): string {
    while (window.localStorage.getItem('local:' + this.lastId)) {
      this.lastId += 1;
    }

    const id = 'local:' + this.lastId;
    this.lastId += 1;

    return id;
  }

  public getItem(key: string, defaultValue: any = null): any {
    const data = window.localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  }

  public setItem(key: string, value: any): void {
    const data = value === undefined ? '' : JSON.stringify(value);
    window.localStorage.setItem(key, data);
  }
}
