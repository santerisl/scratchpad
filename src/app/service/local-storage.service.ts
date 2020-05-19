import { Injectable } from '@angular/core';
import StorageService from '../StorageService';
import Scratchpad from '../Scratchpad';
import Item from '../Item';
import ScratchpadView from '../ScratchpadView';

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

  loadScratchpad(view: ScratchpadView): Promise<Scratchpad> {
    return new Promise<Scratchpad>((resolve, reject) => {
      const sp: Scratchpad = this.getItem(view.id);
      if (sp) {
        resolve(sp);
      } else {
        reject({status: 404});
      }
    });
  }

  removeScratchpad(view: ScratchpadView): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      window.localStorage.removeItem(view.id);
      resolve();
    });
  }

  addItem(view: ScratchpadView, content: string): Promise<Item> {
    return new Promise<Item>((resolve, reject) => {
      const sp: Scratchpad = this.getItem(view.id);
      let itemId = Math.max(...sp.items.map(i => i.id), 0) + 1;
      const item: Item = {
        id: itemId++,
        content,
        time: Date.now()
      };
      sp.items.unshift(item);

      this.setItem(view.id, sp);
      resolve(item);
    });
  }

  removeItem(view: ScratchpadView, itemId: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const sp: Scratchpad = this.getItem(view.id);
      sp.items = sp.items.filter(other => other.id !== itemId);
      this.setItem(view.id, sp);
      resolve();
    });

  }

  modifyItem(view: ScratchpadView, itemId: number, content: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const sp: Scratchpad = this.getItem(view.id);
      sp.items.map(item => {
        if (item.id === itemId) {
          item.content = content;
        }
      });
      this.setItem(view.id, sp);
      resolve();
    });
  }

  public getIds(): ScratchpadView[] {
    const ids: ScratchpadView[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const id = localStorage.key(i);
      if (id.startsWith('local:')) {
        ids.push({id, remote: false});
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
