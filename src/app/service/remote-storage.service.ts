import { Injectable } from '@angular/core';
import StorageService from '../StorageService';
import { HttpClient } from '@angular/common/http';
import Scratchpad from '../Scratchpad';
import Item from '../Item';
import { LocalStorageService } from './local-storage.service';

@Injectable()
export class RemoteStorageService implements StorageService {

  constructor(private http: HttpClient, private lsService: LocalStorageService) {}

  loadScratchpad(id: string): Promise<Scratchpad> {
    return this.http.get<Scratchpad>(`/api/scratchpad/${id}`).toPromise();
  }

  createScratchpad(name: string): Promise<string> {
    return this.http.post<Scratchpad>('/api/scratchpad', {name} ).toPromise()
      .then((sp) => {
          this.addId(sp.id);
          return sp.id;
        });
  }
  removeScratchpad(id: string): Promise<void> {
    return this.http.delete<void>(`/api/scratchpad/${id}`).toPromise()
      .then(() => this.removeId(id));
  }

  addItem(id: string, content: string): Promise<Item> {
    return this.http.post<Item>(`/api/scratchpad/${id}/items`, {content} ).toPromise();
  }
  removeItem(id: string, itemId: number): Promise<void> {
    return this.http.delete<void>(`/api/scratchpad/${id}/items/${itemId}`).toPromise();
  }
  modifyItem(id: string, itemId: number, content: string): Promise<void> {
    return this.http.put<void>(`/api/scratchpad/${id}/items/${itemId}`, {content} ).toPromise();
  }

  public getIds(): string[] {
    return this.lsService.getItem('remoteIds', []);
  }

  public removeId(id: string) {
    this.lsService.setItem('remoteIds', this.getIds().filter(other => id !== other));
  }

  public addId(id: string) {
    this.lsService.setItem('remoteIds', [...this.getIds(), id]);
  }
}
